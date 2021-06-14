package com.bigbasti.poker.api.service;

import com.bigbasti.poker.data.entity.PokerLobby;
import com.bigbasti.poker.data.entity.PokerUser;
import com.bigbasti.poker.data.repository.LobbyRepository;
import com.bigbasti.poker.data.types.GameType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
public class LobbyService {
    private final LobbyRepository lobbyRepository;

    @Autowired
    public LobbyService(LobbyRepository lobbyRepository) {
        this.lobbyRepository = lobbyRepository;
    }

    public PokerLobby createLobby(String name, PokerUser currentUser) {
        PokerLobby lobby = new PokerLobby(null, name, GameType.FULL, 5000, 2, 10, 60);
        lobby.setPlayer1(currentUser);
        lobby.setCreator(currentUser);
        lobbyRepository.saveAndFlush(lobby);
        return lobby;
    }
}
