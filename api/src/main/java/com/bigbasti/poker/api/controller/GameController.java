package com.bigbasti.poker.api.controller;

import com.bigbasti.poker.api.service.GameService;
import com.bigbasti.poker.api.service.LobbyService;
import com.bigbasti.poker.api.tools.PokerDeck;
import com.bigbasti.poker.data.entity.*;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.InvalidParameterException;
import java.util.ArrayList;
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

    @PostMapping("/round/start")
    public @ResponseBody
    ResponseEntity startNextRound() {
        List<PokerPlayer> foundPlayers = playerRepository.getPlayerByUserId(getCurrentUser()).orElseThrow(() -> new InvalidParameterException("could not find a player for the user"));
        PokerPlayer playerForUser = foundPlayers.get(0);
        PokerGame game = gameRepository.getCurrentPokerGame(playerForUser).orElseThrow(() -> new InvalidParameterException("could not find a game for the user"));

        PokerRound currentRound = game.getRounds().stream().filter(r -> !r.getFinished()).findFirst().orElse(null);
        if (currentRound != null) {
            // there is already an active round -> cancel
            return ResponseEntity.badRequest().body("There is already an active round!");
        }

        PokerRound nextRound = new PokerRound(null, game.getGameRounds() + 1, null, game.getBigBlind(), game.getSmallBlind(), new ArrayList<>());

        List<PokerCard> shuffledDeck = PokerDeck.shuffle();
        int players = game.getPlayers().size();
        if (players == 2) {     // todo bug -> player draw overlapping cards
            PokerCard c1 = shuffledDeck.get(0);
            PokerCard c2 = shuffledDeck.get(1);
            shuffledDeck.remove(0);
            shuffledDeck.remove(1);
            nextRound.setP1Cards(PokerDeck.deckToString(List.of(c1, c2)));

            c1 = shuffledDeck.get(0);
            c2 = shuffledDeck.get(1);
            shuffledDeck.remove(0);
            shuffledDeck.remove(1);
            nextRound.setP2Cards(PokerDeck.deckToString(List.of(c1, c2)));
            nextRound.setCurrentTurn(0);        // toto pruefen
        }

        nextRound.setDeck(PokerDeck.deckToString(shuffledDeck));
        nextRound.setDealer(game.getPlayers().get(0)); // todo anhängig von vorrunde machen
        nextRound.setRemovedCards("");

        nextRound.setFinished(false);

        logger.debug("starting next round for game {}", game.getName());
        roundRepository.saveAndFlush(nextRound);
        game.getRounds().add(nextRound);
        gameRepository.saveAndFlush(game);
        return ResponseEntity.ok().build(); // do not return anything, client will reload state on its own
    }

}
