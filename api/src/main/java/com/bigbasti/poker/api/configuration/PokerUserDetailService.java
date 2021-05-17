package com.bigbasti.poker.api.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class PokerUserDetailService implements UserDetailsService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    final
    UserRepository userRepository;

    public PokerUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.debug("loading details for user {}", username);
        ZebraUser user = userRepository.findByUserNameIs(username);
        if (user == null) {
            logger.warn("the user {} is not registered as a ZEBRA user", username);
            throw new UsernameNotFoundException(username);
        }
        logger.debug("successfully found user for username {}", username);
        user.getRoles().forEach(r -> r.getPermissions().size());
        user.getTeams().size();
        return new ZebraPrincipal(user);
    }
}
