package com.bigbasti.poker.api.service;

import com.bigbasti.poker.api.model.RegisterUserModel;
import com.bigbasti.poker.data.entity.PokerUser;
import com.bigbasti.poker.data.repository.LobbyRepository;
import com.bigbasti.poker.data.repository.UserRepository;
import org.apache.commons.compress.archivers.zip.ZipUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import static com.bigbasti.poker.api.configuration.PokerAuthenticationProvider.sha1;

@Service
public class UserService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public PokerUser registerUser(RegisterUserModel model) {
        PokerUser user = new PokerUser(null, model.getEmail(), model.getName(), false, "", model.getGender());
        if (model.getPass1().equals(model.getPass2())) {
            String hash = sha1(model.getPass1());
            user.setPass(hash);
        } else {
            throw new IllegalArgumentException("The password do not match");
        }
        return userRepository.saveAndFlush(user);
    }
}
