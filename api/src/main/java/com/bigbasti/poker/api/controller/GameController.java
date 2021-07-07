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
import java.util.Optional;

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
        PokerGame game = pokerGames.get(0);

        // remove parts from model which the player is not supposed to know
        Optional<PokerRound> roundOpt = game.getRounds().stream().filter(r -> !r.getFinished()).findFirst();
        if (roundOpt.isPresent()) {
            PokerRound round = roundOpt.get();
            round.setDeck("#");
            round.setRemovedCards("#");

            int playerNum = 0;
            for (int i = 0; i < game.getPlayers().size(); i++) {
                if (game.getPlayers().get(i).getId().equals(playerForUser.getId())) {
                    round.removeCardsExceptForPlayer(i+1);
                    break;
                }
            }
        }

        return ResponseEntity.ok(game);
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
    ResponseEntity startNewRound() {
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
        logger.debug("# created new deck with: {}", PokerDeck.deckToString(shuffledDeck));
        int players = game.getPlayers().size();
        if (players == 2) {
            PokerCard c1 = shuffledDeck.get(0);
            PokerCard c2 = shuffledDeck.get(1);
            shuffledDeck.remove(c1);
            shuffledDeck.remove(c2);
            logger.debug("# cards for p1 {}", PokerDeck.deckToString(List.of(c1, c2)));
            logger.debug("# deck after cards removed for p1: {}", PokerDeck.deckToString(shuffledDeck));
            nextRound.setP1Cards(PokerDeck.deckToString(List.of(c1, c2)));
            game.getPlayers().get(0).setCard1(PokerDeck.deckToString(List.of(c1)));
            game.getPlayers().get(0).setCard2(PokerDeck.deckToString(List.of(c2)));

            c1 = shuffledDeck.get(0);
            c2 = shuffledDeck.get(1);
            shuffledDeck.remove(c1);
            shuffledDeck.remove(c2);
            logger.debug("# cards for p2 {}", PokerDeck.deckToString(List.of(c1, c2)));
            logger.debug("# deck after cards removed for p2: {}", PokerDeck.deckToString(shuffledDeck));
            nextRound.setP2Cards(PokerDeck.deckToString(List.of(c1, c2)));
            game.getPlayers().get(1).setCard1(PokerDeck.deckToString(List.of(c1)));
            game.getPlayers().get(1).setCard2(PokerDeck.deckToString(List.of(c2)));
            nextRound.setCurrentTurn(1);
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

    @PostMapping("/round/next")
    public @ResponseBody
    ResponseEntity startNextRound() {
        List<PokerPlayer> foundPlayers = playerRepository.getPlayerByUserId(getCurrentUser()).orElseThrow(() -> new InvalidParameterException("could not find a player for the user"));
        PokerPlayer playerForUser = foundPlayers.get(0);
        PokerGame game = gameRepository.getCurrentPokerGame(playerForUser).orElseThrow(() -> new InvalidParameterException("could not find a game for the user"));

        PokerRound currentRound = game.getRounds().stream().filter(r -> !r.getFinished()).findFirst().orElse(null);
        if (currentRound == null) {
            // there is already an active round -> cancel
            return ResponseEntity.badRequest().body("There is no active round please start one first!");
        }

        List<PokerCard> deck = PokerDeck.deckFromString(currentRound.getDeck());
        logger.debug("# loaded deck for round {}: {}", currentRound.getId(), PokerDeck.deckToString(deck));
        if (currentRound.getCurrentTurn() == 1) {
            // no cards revealed yet => show first 3
            PokerCard d1 = deck.get(0);
            PokerCard t1 = deck.get(1);
            PokerCard d2 = deck.get(2);
            PokerCard t2 = deck.get(3);
            PokerCard d3 = deck.get(4);
            PokerCard t3 = deck.get(5);

            logger.debug("# cards removed from deck for CT1 {}", PokerDeck.deckToString(List.of(d1, t1, d2, t2, d3, t3)));
            List<PokerCard> removedCards = PokerDeck.deckFromString(currentRound.getRemovedCards());
            removedCards.add(d1);
            removedCards.add(d2);
            removedCards.add(d3);
            currentRound.setRemovedCards(PokerDeck.deckToString(removedCards));
            logger.debug("# removed cards after CT1 {}", PokerDeck.deckToString(removedCards));

            List<PokerCard> revealedCards = PokerDeck.deckFromString(currentRound.getOpenCards());
            revealedCards.add(t1);
            revealedCards.add(t2);
            revealedCards.add(t3);
            currentRound.setOpenCards(PokerDeck.deckToString(revealedCards));
            logger.debug("# revealed cards after CT1 {}", PokerDeck.deckToString(revealedCards));

            deck.remove(d1);
            deck.remove(d2);
            deck.remove(d3);
            deck.remove(t1);
            deck.remove(t2);
            deck.remove(t3);

            logger.debug("# deck after card removal CT1 {}", PokerDeck.deckToString(deck));
            currentRound.setDeck(PokerDeck.deckToString(deck));
            currentRound.setCurrentTurn(2);
        } else if (currentRound.getCurrentTurn() == 2) {
            PokerCard d1 = deck.get(0);
            PokerCard t1 = deck.get(1);

            logger.debug("# cards removed from deck for CT2 {}", PokerDeck.deckToString(List.of(d1, t1)));

            List<PokerCard> removedCards = PokerDeck.deckFromString(currentRound.getRemovedCards());
            removedCards.add(d1);
            currentRound.setRemovedCards(PokerDeck.deckToString(removedCards));
            logger.debug("# removed cards after CT2 {}", PokerDeck.deckToString(removedCards));

            List<PokerCard> revealedCards = PokerDeck.deckFromString(currentRound.getOpenCards());
            revealedCards.add(t1);
            currentRound.setOpenCards(PokerDeck.deckToString(revealedCards));
            logger.debug("# revealed cards after CT2 {}", PokerDeck.deckToString(revealedCards));

            deck.remove(d1);
            deck.remove(t1);

            logger.debug("# deck after card removal CT2 {}", PokerDeck.deckToString(deck));
            currentRound.setDeck(PokerDeck.deckToString(deck));
            currentRound.setCurrentTurn(3);
        } else if (currentRound.getCurrentTurn() == 3) {
            PokerCard d1 = deck.get(0);
            PokerCard t1 = deck.get(1);
            logger.debug("# cards removed from deck for CT3 {}", PokerDeck.deckToString(List.of(d1, t1)));

            List<PokerCard> removedCards = PokerDeck.deckFromString(currentRound.getRemovedCards());
            removedCards.add(d1);
            currentRound.setRemovedCards(PokerDeck.deckToString(removedCards));
            logger.debug("# removed cards after CT3 {}", PokerDeck.deckToString(removedCards));

            List<PokerCard> revealedCards = PokerDeck.deckFromString(currentRound.getOpenCards());
            revealedCards.add(t1);
            currentRound.setOpenCards(PokerDeck.deckToString(revealedCards));
            logger.debug("# revealed cards after CT3 {}", PokerDeck.deckToString(revealedCards));

            deck.remove(d1);
            deck.remove(t1);

            logger.debug("# deck after card removal CT3 {}", PokerDeck.deckToString(deck));
            currentRound.setDeck(PokerDeck.deckToString(deck));
            currentRound.setCurrentTurn(4);
        } else if (currentRound.getCurrentTurn() == 4) {
            // show all player's cards
        }

        logger.debug("starting next round for game {}", game.getName());
        roundRepository.saveAndFlush(currentRound);
        return ResponseEntity.ok().build(); // do not return anything, client will reload state on its own
    }

}
