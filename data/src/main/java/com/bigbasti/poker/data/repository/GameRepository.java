package com.bigbasti.poker.data.repository;

import com.bigbasti.poker.data.entity.PokerGame;
import com.bigbasti.poker.data.entity.PokerLobby;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<PokerGame, Integer> {
}
