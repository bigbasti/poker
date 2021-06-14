package com.bigbasti.poker.api.controller;

import com.bigbasti.poker.api.service.LobbyService;
import com.bigbasti.poker.data.entity.PokerLobby;
import com.bigbasti.poker.data.repository.LobbyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(path = "/api/lobby")
public class LobbyController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    final LobbyRepository lobbyRepository;
    final LobbyService lobbyService;

    @Autowired
    public LobbyController(LobbyRepository lobbyRepository, LobbyService lobbyService) {
        this.lobbyRepository = lobbyRepository;
        this.lobbyService = lobbyService;
    }

    @GetMapping("")
    public @ResponseBody
    ResponseEntity getAllLobbys() {
        List<PokerLobby> lobbys = lobbyRepository.findAll();
        if (lobbys == null) {lobbys = new ArrayList<>();}
        logger.debug("returning all lobbies {}", lobbys.size());
        return ResponseEntity.ok(lobbys);
    }

    @PostMapping("")
    public @ResponseBody
    ResponseEntity createLobby(@RequestBody @NotNull String name) {
        logger.debug("creating new lobby {} for user {}", name, getCurrentUser().getEmail());
        PokerLobby lobby = lobbyService.createLobby(name, getCurrentUser());
        logger.debug("successfully created lobby");
        return ResponseEntity.ok(lobby);
    }

    @GetMapping("/{id}/join")
    public @ResponseBody
    ResponseEntity joinLobby(@PathVariable @NotNull Integer id) {
        logger.debug("user {} joins lobby {}", getCurrentUser().getEmail(), id);
        PokerLobby pokerLobby = lobbyRepository.findById(id).orElseThrow(() -> new RuntimeException("uknown id privided to join " + id));
        pokerLobby.addPlayer(getCurrentUser());
        lobbyRepository.save(pokerLobby);
        logger.debug("successfully joined lobby");
        return ResponseEntity.ok(pokerLobby);
    }

    @GetMapping("/current")
    public @ResponseBody
    ResponseEntity getCurrentLobby() {
        logger.debug("loading current lobby for user {}", getCurrentUser().getEmail());
        List<PokerLobby> pokerLobbies = lobbyRepository.getCurrentPokerLobby(getCurrentUser()).orElseThrow(() -> new InvalidParameterException("could not find a lobby for the user"));
        if (pokerLobbies.size() > 1) {
            logger.error("found more than one lobby for user {}", getCurrentUser().getEmail());
            // todo: only the most recent lobby must be valid, delete the old ones
        }
        PokerLobby target = pokerLobbies.get(0);
        logger.debug("successfully found lobby for user {} (lobby: {})", getCurrentUser().getEmail(), target.getName());
        return ResponseEntity.ok(target);
    }

    @PostMapping("/leave")
    public @ResponseBody
    ResponseEntity leaveCurrentLobby() {
        logger.debug("leaving current lobby for user {}", getCurrentUser().getEmail());
        List<PokerLobby> pokerLobbies = lobbyRepository.getCurrentPokerLobby(getCurrentUser()).orElseThrow(() -> new InvalidParameterException("could not find a lobby for the user"));
        if (pokerLobbies.size() > 1) {
            logger.error("found more than one lobby for user {}", getCurrentUser().getEmail());
            // todo: only the most recent lobby must be valid, delete the old ones
        }
        PokerLobby target = pokerLobbies.get(0);
        if (target.getCreator().getId() == getCurrentUser().getId()) {
            // user is creator, if he leaves lobby mus be destroyed
            logger.debug("user is admin of lobby, lobby is deleted");
            lobbyRepository.delete(target);
            lobbyRepository.flush();
        } else {
            // user is not creator -> just remove him
            target.removeUser(getCurrentUser());
            lobbyRepository.saveAndFlush(target);

        }
        logger.debug("successfully removed user {}  from lobby: {}", getCurrentUser().getEmail(), target.getName());
        return ResponseEntity.ok(target);
    }

}
