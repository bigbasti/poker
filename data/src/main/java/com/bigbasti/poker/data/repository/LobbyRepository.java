package com.bigbasti.poker.data.repository;

import com.bigbasti.poker.data.entity.PokerLobby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LobbyRepository extends JpaRepository<PokerLobby, Integer> {

    @Query("select l from PokerLobby l where l.player1 = :playerid or l.player2 = :playerid or l.player3 = :playerid or l.player4 = :playerid or l.player5 = :playerid or l.player6 = :playerid or l.player7 = :playerid or l.player8 = :playerid")
    Optional<List<PokerLobby>> getCurrentPokerLobby(@Param("playerid") Integer playerId);
}
