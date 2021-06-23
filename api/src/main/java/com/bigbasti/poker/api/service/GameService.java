package com.bigbasti.poker.api.service;

import com.bigbasti.poker.data.entity.PokerGame;
import com.bigbasti.poker.data.entity.PokerLobby;
import com.bigbasti.poker.data.entity.PokerPlayer;
import com.bigbasti.poker.data.repository.GameRepository;
import com.bigbasti.poker.data.repository.LobbyRepository;
import com.bigbasti.poker.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class GameService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final LobbyRepository lobbyRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    public GameService(LobbyRepository lobbyRepository, UserRepository userRepository, GameRepository gameRepository) {
        this.lobbyRepository = lobbyRepository;
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
    }

    public PokerGame startGame(PokerLobby lobby) {
        PokerGame newGame = new PokerGame(null, lobby.getName(), lobby.getType(), LocalDateTime.now(), lobby.getSmallBlind(), lobby.getBigBlind(), lobby.getIdleTime(), new ArrayList<>());
        newGame.setCreator(lobby.getCreator());
        newGame.setIntervallRounds(lobby.getIntervalRounds());
        newGame.setIntervallTime(lobby.getIdleTime());
        newGame.setStartingMoney(lobby.getMoney());
        newGame.setGameRounds(0);
        newGame.setGameRounds(0);

        newGame.getPlayers().add(new PokerPlayer(lobby.getPlayer1(), newGame.getStartingMoney()));
        if (lobby.getPlayer2() != null) { newGame.getPlayers().add(new PokerPlayer(lobby.getPlayer2(), newGame.getStartingMoney()));}
        if (lobby.getPlayer3() != null) { newGame.getPlayers().add(new PokerPlayer(lobby.getPlayer3(), newGame.getStartingMoney()));}
        if (lobby.getPlayer4() != null) { newGame.getPlayers().add(new PokerPlayer(lobby.getPlayer4(), newGame.getStartingMoney()));}
        if (lobby.getPlayer5() != null) { newGame.getPlayers().add(new PokerPlayer(lobby.getPlayer5(), newGame.getStartingMoney()));}
        if (lobby.getPlayer6() != null) { newGame.getPlayers().add(new PokerPlayer(lobby.getPlayer6(), newGame.getStartingMoney()));}
        if (lobby.getPlayer7() != null) { newGame.getPlayers().add(new PokerPlayer(lobby.getPlayer7(), newGame.getStartingMoney()));}
        if (lobby.getPlayer8() != null) { newGame.getPlayers().add(new PokerPlayer(lobby.getPlayer8(), newGame.getStartingMoney()));}

        newGame = gameRepository.saveAndFlush(newGame);

        lobbyRepository.delete(lobby);
        lobbyRepository.flush();

        return newGame;
    }
}
