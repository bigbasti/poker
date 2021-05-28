package com.bigbasti.poker.api.controller;

import com.bigbasti.poker.data.entity.PokerLobby;
import com.bigbasti.poker.data.repository.LobbyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(path = "/api/lobby")
public class LobbyController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    final LobbyRepository lobbyRepository;

    @Autowired
    public LobbyController(LobbyRepository lobbyRepository) {
        this.lobbyRepository = lobbyRepository;
    }

    @GetMapping("")
    public @ResponseBody
    ResponseEntity getAllLobbys() {
        List<PokerLobby> lobbys = lobbyRepository.findAll();
        if (lobbys == null) {lobbys = new ArrayList<>();}
        logger.debug("returning all lobbies {}", lobbys.size());
        return ResponseEntity.ok(lobbys);
    }
}
