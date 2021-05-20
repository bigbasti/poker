package com.bigbasti.poker.api.controller;

import com.bigbasti.poker.data.entity.PokerUser;
import com.bigbasti.poker.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class BaseController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    UserRepository userRepository;

    @Autowired
    SessionRegistry sessionRegistry;

    public PokerUser getCurrentUser(){
        return userRepository.findByEmailIs(((PokerUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail());
    }

    static Collection<? extends GrantedAuthority> getCurrentUserGroups(){
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities();
    }

    /**
     * returns all currently logged in users
     * @return
     */
    public List<PokerUser> getLoggedInUsers() {
        final List<Object> allPrincipals = sessionRegistry.getAllPrincipals();
        return allPrincipals.stream()
                .filter(principal -> !sessionRegistry.getAllSessions(principal, false).isEmpty())
                .filter(principal -> principal instanceof PokerUser)
                .map(principal -> (PokerUser) principal)
                .collect(Collectors.toList());
    }

    /**
     * immediately terminates a users session
     * @param userMail user name of the user to be logged out
     */
    public void logOutUser(String userMail){
        sessionRegistry.getAllPrincipals().stream()
                .filter(user -> !sessionRegistry.getAllSessions(user, false).isEmpty())
                .filter(user -> user instanceof PokerUser)
                .filter(user -> ((PokerUser)user).getEmail().equals(userMail))
                .forEach(user -> {
                    List<SessionInformation> sessionInfos = sessionRegistry.getAllSessions(user, false);
                    if(null != sessionInfos && !sessionInfos.isEmpty()){
                        for(SessionInformation sInfo : sessionInfos){
                            logger.debug("Expiring session {} for user {}", sInfo.getSessionId(), ((PokerUser)user).getEmail());
                            sInfo.expireNow();
                        }
                    }
                });
    }

    /**
     * checks if a user has an active server session
     * @param userMail username to check
     * @return true if active user session is found
     */
    public boolean isUserLoggedIn(String userMail){
        return sessionRegistry.getAllPrincipals().stream()
                .filter(user -> !sessionRegistry.getAllSessions(user, false).isEmpty())
                .filter(user -> user instanceof PokerUser)
                .anyMatch(user -> ((PokerUser) user).getEmail().equals(userMail));
    }
}
