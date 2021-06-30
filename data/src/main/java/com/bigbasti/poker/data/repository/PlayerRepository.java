package com.bigbasti.poker.data.repository;

import com.bigbasti.poker.data.entity.PokerPlayer;
import com.bigbasti.poker.data.entity.PokerUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PlayerRepository extends JpaRepository<PokerPlayer, Integer> {

    @Query("select p from PokerPlayer p where p.user = :userId")
    Optional<List<PokerPlayer>> getPlayerByUserId(@Param("userId") PokerUser userId);
}
