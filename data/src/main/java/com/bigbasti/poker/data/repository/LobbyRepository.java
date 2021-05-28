package com.bigbasti.poker.data.repository;

import com.bigbasti.poker.data.entity.PokerLobby;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LobbyRepository extends JpaRepository<PokerLobby, Integer> {
}
