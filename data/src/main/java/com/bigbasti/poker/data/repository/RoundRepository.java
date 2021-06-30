package com.bigbasti.poker.data.repository;

import com.bigbasti.poker.data.entity.PokerGame;
import com.bigbasti.poker.data.entity.PokerRound;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RoundRepository extends JpaRepository<PokerRound, Integer> {
    @Query("select r from PokerRound r where r.game = :game")
    Optional<List<PokerRound>> getRoundsForGame(@Param("game") PokerGame game);
}
