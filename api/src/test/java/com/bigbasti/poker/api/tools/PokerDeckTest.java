package com.bigbasti.poker.api.tools;

import com.bigbasti.poker.data.entity.PokerCard;
import org.junit.Assert;
import org.junit.Test;

import java.util.List;

public class PokerDeckTest {

    @Test
    public void shufflingDeckYieldsRandomResults() {
        List<PokerCard> cards = PokerDeck.shuffle();
        List<PokerCard> cards2 = PokerDeck.shuffle();

        String cardsStr = PokerDeck.deckToString(cards);
        String cards2Str = PokerDeck.deckToString(cards2);
        System.out.println(cardsStr);
        System.out.println(cards2Str);

        Assert.assertNotEquals(cardsStr, cards2Str);
    }
}
