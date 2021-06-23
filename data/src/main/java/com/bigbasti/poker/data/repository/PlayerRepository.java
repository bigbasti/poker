package com.bigbasti.poker.data.repository;

import com.bigbasti.poker.data.entity.PokerGame;
import com.bigbasti.poker.data.entity.PokerPlayer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<PokerPlayer, Integer> {
}
