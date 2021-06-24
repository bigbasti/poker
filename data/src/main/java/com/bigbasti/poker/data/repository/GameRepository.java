package com.bigbasti.poker.data.repository;

import com.bigbasti.poker.data.entity.PokerGame;
import com.bigbasti.poker.data.entity.PokerPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<PokerGame, Integer> {

    @Query("select g from PokerGame g where :player member of g.players")
    Optional<List<PokerGame>> getCurrentPokerGames(@Param("player") PokerPlayer player);
}
