package com.bigbasti.poker.api.service;

import com.bigbasti.poker.data.entity.PokerLobby;
import com.bigbasti.poker.data.entity.PokerUser;
import com.bigbasti.poker.data.repository.LobbyRepository;
import com.bigbasti.poker.data.types.GameType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;
import java.security.InvalidParameterException;
import java.util.List;

@Service
@Validated
public class LobbyService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final LobbyRepository lobbyRepository;

    @Autowired
    public LobbyService(LobbyRepository lobbyRepository) {
        this.lobbyRepository = lobbyRepository;
    }

    public PokerLobby createLobby(String name, PokerUser currentUser) {
        PokerLobby lobby = new PokerLobby(null, name, GameType.FULL, 5000, 2, 10, 60);
        lobby.setIntervalRounds(0);
        lobby.setIntervalTime(0);
        lobby.setPlayer1(currentUser);
        lobby.setCreator(currentUser);
        lobbyRepository.saveAndFlush(lobby);
        return lobby;
    }

    public PokerLobby leaveLobby(PokerUser currentUser) {
        List<PokerLobby> pokerLobbies = lobbyRepository.getCurrentPokerLobby(currentUser).orElseThrow(() -> new InvalidParameterException("could not find a lobby for the user"));
        if (pokerLobbies.size() > 1) {
            logger.error("found more than one lobby for user {}", currentUser.getEmail());
            // todo: only the most recent lobby must be valid, delete the old ones
        }
        PokerLobby target = pokerLobbies.get(0);
        if (target.getCreator().getId().equals(currentUser.getId())) {
            // user is creator, if he leaves lobby mus be destroyed
            logger.debug("user is admin of lobby, lobby is deleted");
            lobbyRepository.delete(target);
            lobbyRepository.flush();
        } else {
            // user is not creator -> just remove him
            target.removeUser(currentUser);
            lobbyRepository.saveAndFlush(target);
        }
        return target;
    }

    public PokerLobby joinLobby(@NotNull Integer lobbyId, PokerUser currentUser){
        PokerLobby pokerLobby = lobbyRepository.findById(lobbyId).orElseThrow(() -> new RuntimeException("uknown id privided to join " + lobbyId));
        pokerLobby.addPlayer(currentUser);
        return lobbyRepository.save(pokerLobby);
    }

    public PokerLobby updateLobby(@NotNull PokerLobby lobby, PokerUser currentUser){
        PokerLobby pokerLobby = lobbyRepository.findById(lobby.getId()).orElseThrow(() -> new RuntimeException("uknown id privided to update " + lobby.getId()));
        if (!pokerLobby.getCreator().getId().equals(currentUser.getId())) {
            throw new InvalidParameterException("This lobby (" + lobby.getId() + ") does not belong to the user who wants to modify it (" + currentUser.getEmail() + ")");
        }

        pokerLobby.setType(lobby.getType());
        pokerLobby.setMoney(lobby.getMoney());
        pokerLobby.setSmallBlind(lobby.getSmallBlind());
        pokerLobby.setBigBlind(lobby.getBigBlind());
        pokerLobby.setIntervalTime(lobby.getIntervalTime());
        pokerLobby.setIntervalRounds(lobby.getIntervalRounds());
        pokerLobby.setIdleTime(lobby.getIdleTime());

        return lobbyRepository.saveAndFlush(pokerLobby);
    }
}
