package com.bigbasti.poker.api.configuration;

import com.bigbasti.poker.data.entity.PokerUser;
import com.bigbasti.poker.data.repository.UserRepository;
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
import org.springframework.stereotype.Component;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Sebastian Gross on 22.02.2018.
 */
@Component
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

        PokerUser user = userRepository.findByEmailIs(username);
        if(user == null){
            logger.warn("unsuccessful login attempt for user {}", username);
            throw new BadCredentialsException(BAD_CREDENTIALS);
        }


        checkUserForLogin(user, password);


        List<String> userGroups = new ArrayList<>();
        userGroups.add("USER");
        if (user.getAdmin()) {
            userGroups.add("ADMIN");
        }
        logger.debug("found user: {} with roles {}", user, userGroups);

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        for(String group : userGroups) {
            grantedAuthorities.add(new SimpleGrantedAuthority(group));
        }


        return new UsernamePasswordAuthenticationToken(user, null, grantedAuthorities);
    }

    void checkUserForLogin(PokerUser loggedInUser, String pswd) {
        // 1. check whether the provided pswd is correct
        String passwordHash = null;
        passwordHash = sha1(pswd);

        if(!loggedInUser.getPass().equalsIgnoreCase(passwordHash)){
            logger.warn("unsuccessful login attempt for user {}", loggedInUser.getEmail());
            throw new BadCredentialsException(BAD_CREDENTIALS);
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    public static String sha1(String input) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("SHA1");
            byte[] result = messageDigest.digest(input.getBytes(Charset.forName(StandardCharsets.UTF_8.name())));
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < result.length; i++) {
                sb.append(Integer.toString((result[i] & 0xff) + 0x100, 16).substring(1));
            }
            return sb.toString();
        }catch(Exception ex){
            return "";
        }
    }
}