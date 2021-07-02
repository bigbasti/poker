package com.bigbasti.poker.data.entity;

import com.bigbasti.poker.data.types.CardSuite;
import com.bigbasti.poker.data.types.CardType;

public class PokerCard {
    private CardSuite suite;
    private CardType type;
    private Integer value;

    public PokerCard(CardSuite suite, CardType type, Integer value) {
        this.suite = suite;
        this.type = type;
        this.value = value;
    }

    public CardSuite getSuite() {
        return suite;
    }

    public void setSuite(CardSuite suite) {
        this.suite = suite;
    }

    public CardType getType() {
        return type;
    }

    public void setType(CardType type) {
        this.type = type;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "PokerCard{" +
                "suite=" + suite +
                ", type=" + type +
                ", value=" + value +
                '}';
    }
}
