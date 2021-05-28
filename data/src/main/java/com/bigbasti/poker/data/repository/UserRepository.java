package com.bigbasti.poker.data.repository;

import com.bigbasti.poker.data.entity.PokerUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<PokerUser, Integer> {
    PokerUser findByEmailIs(String email);
}
