package com.bigbasti.poker.api.controller;

import com.bigbasti.poker.api.service.GameService;
import com.bigbasti.poker.api.service.LobbyService;
import com.bigbasti.poker.data.entity.PokerGame;
import com.bigbasti.poker.data.entity.PokerLobby;
import com.bigbasti.poker.data.entity.PokerPlayer;
import com.bigbasti.poker.data.entity.PokerRound;
import com.bigbasti.poker.data.repository.GameRepository;
import com.bigbasti.poker.data.repository.LobbyRepository;
import com.bigbasti.poker.data.repository.PlayerRepository;
import com.bigbasti.poker.data.repository.RoundRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.InvalidParameterException;
import java.util.List;

@Controller
@RequestMapping(path = "/api/game")
public class GameController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    final LobbyRepository lobbyRepository;
    final LobbyService lobbyService;
    final GameService gameService;
    final GameRepository gameRepository;
    final PlayerRepository playerRepository;
    final RoundRepository roundRepository;

    @Autowired
    public GameController(LobbyRepository lobbyRepository, LobbyService lobbyService, GameService gameService, GameRepository gameRepository, PlayerRepository playerRepository, RoundRepository roundRepository) {
        this.lobbyRepository = lobbyRepository;
        this.lobbyService = lobbyService;
        this.gameService = gameService;
        this.gameRepository = gameRepository;
        this.playerRepository = playerRepository;
        this.roundRepository = roundRepository;
    }

    @GetMapping("")
    public @ResponseBody
    ResponseEntity getCurrentGame() {
        logger.debug("loading game for {}", getCurrentUser().getEmail());
        List<PokerPlayer> foundPlayers = playerRepository.getPlayerByUserId(getCurrentUser()).orElseThrow(() -> new InvalidParameterException("could not find a player for the user"));
        PokerPlayer playerForUser = foundPlayers.get(0);

        List<PokerGame> pokerGames = gameRepository.getCurrentPokerGames(playerForUser).orElseThrow(() -> new InvalidParameterException("could not find a game for the player"));
        PokerGame gameForPlayer = pokerGames.get(0);

        return ResponseEntity.ok(gameForPlayer);
    }

    @GetMapping("/start")
    public @ResponseBody
    ResponseEntity startGame() {
        logger.debug("starting game for user {}", getCurrentUser().getEmail());
        List<PokerLobby> pokerLobbies = lobbyRepository.getCurrentPokerLobby(getCurrentUser()).orElseThrow(() -> new InvalidParameterException("could not find a lobby for the user"));
        if (pokerLobbies.size() > 1) {
            logger.error("found more than one lobby for user {}", getCurrentUser().getEmail());
            // todo: only the most recent lobby must be valid, delete the old ones
        }
        PokerLobby target = pokerLobbies.get(0);
        PokerGame pokerGame = gameService.startGame(target);
        return ResponseEntity.ok(pokerGame);
    }

}
