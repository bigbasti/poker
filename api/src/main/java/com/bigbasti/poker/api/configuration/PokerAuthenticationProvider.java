package com.bigbasti.poker.api.configuration;

import org.hibernate.validator.internal.util.StringHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Sebastian Gross on 22.02.2018.
 */
//@Component
public class PokerAuthenticationProvider implements AuthenticationProvider {
    public static final String BAD_CREDENTIALS = "Bad Credentials";
    private Logger logger = LoggerFactory.getLogger(PokerAuthenticationProvider.class);

    @Autowired
    UserRepository userRepository;

    @Override
    public Authentication authenticate(Authentication authentication) {
        String username = authentication.getName();
        logger.debug("requested authentication for user {}", username);

        String password = authentication.getCredentials().toString();

        if(StringHelper.isNullOrEmptyString(username) || StringHelper.isNullOrEmptyString(password)){
            logger.warn("username or password is missing in the credentials");
            throw new BadCredentialsException(BAD_CREDENTIALS);
        }

        TBenBenutzer user = userRepository.findByBenLoginIs(username);
        if(user == null){
            logger.warn("unsuccessful login attempt for user {}", username);
            throw new BadCredentialsException(BAD_CREDENTIALS);
        }


        checkUserForLogin(user, password);


        List<TBbBenutzerBengr> userGroups = userRepository.getUserGroups(username);
        logger.debug("found user: {}", user);

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        for(TBbBenutzerBengr group : userGroups) {
            grantedAuthorities.add(new SimpleGrantedAuthority(group.getBngBengr().getBngBengrname()));
        }


        return new UsernamePasswordAuthenticationToken(user, null, grantedAuthorities);
    }

    void checkUserForLogin(TBenBenutzer loggedInUser, String pswd) {
        // 1. check whether the provided pswd is correct
        String passwordHash = null;
        passwordHash = HashGenerator.sha1(pswd);

        if(!loggedInUser.getBenPasswort().equalsIgnoreCase(passwordHash.toUpperCase())){
            logger.warn("unsuccessful login attempt for user {}", loggedInUser.getBenLogin());
            // check if user tried to login too many times
            int failedAttempts = loggedInUser.getBenNumberoflogin().intValue();
            int allowedFailedAttempts = Integer.parseInt(configurationEntryRepository.getConfigrationEntryByKetParam(Parameters.PARAM_BEN_ANZ_VERSUCHE).getKetWert());
            if(failedAttempts+1 >= allowedFailedAttempts){
                // lock user
                loggedInUser.setBenSperre("1");
                loggedInUser.setBenNumberoflogin(BigInteger.valueOf(failedAttempts+1));
                userRepository.saveAndFlush(loggedInUser);
                logger.warn("user {} has been locked after {} unsuccessfull login attempts!", loggedInUser, failedAttempts+1);
                throw new BadCredentialsException("Too Many Failed Logins");
            }else{
                // user has some attempts left to provide correct credentials
                loggedInUser.setBenNumberoflogin(BigInteger.valueOf(failedAttempts+1));
                userRepository.saveAndFlush(loggedInUser);
            }
            throw new BadCredentialsException(BAD_CREDENTIALS);
        }

        // reset failed login counter on correct login
        loggedInUser.setBenNumberoflogin(BigInteger.valueOf(0));
        userRepository.saveAndFlush(loggedInUser);

        // 2. check if user account is deactivated
        if(loggedInUser.getBenDeaktiv() == '1'){
            // user is deactivated
            logger.warn("unsuccessful login attempt for user {} [user is deactivated] ", loggedInUser.getBenBenLogin());
            throw new BadCredentialsException("User Deactivated");
        }

        // 3. check if user is locked
        if(loggedInUser.getBenSperre().equals("1")){
            // user is locked
            logger.warn("unsuccessful login attempt for user {} [user is locked] ", loggedInUser.getBenBenLogin());
            throw new BadCredentialsException("User Locked");
        }

        // 4. check if pswd is expired and must be changed
        Integer passwordMaxAge = Integer.parseInt(configurationEntryRepository.getConfigrationEntryByKetParam(Parameters.PARAM_BEN_ABLAUFTAGE).getKetWert());
        LocalDate passwordLastChanged = loggedInUser.getBenPasswortLmod().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate passwordExpirationDate = passwordLastChanged.plusDays(passwordMaxAge);
        if(passwordExpirationDate.isBefore(LocalDate.now())){
            // pswd is expired and must be changed
            // the frontend will redirect the user to the change pswd view after receiving this error message
            logger.warn("pswd for user {} expired on {}", loggedInUser, passwordExpirationDate);
            throw new BadCredentialsException("Password Expired");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}