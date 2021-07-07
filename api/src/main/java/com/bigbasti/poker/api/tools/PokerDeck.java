package com.bigbasti.poker.api.tools;

import com.bigbasti.poker.data.entity.PokerCard;
import com.bigbasti.poker.data.types.CardSuite;
import com.bigbasti.poker.data.types.CardType;
import org.hibernate.internal.util.StringHelper;

import java.util.*;
import java.util.stream.Collectors;

public class PokerDeck {
    public static List<PokerCard> shuffle() {
        ArrayList<PokerCard> cards = new ArrayList<>();
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.C2, 2));
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.C3, 3));
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.C4, 4));
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.C5, 5));
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.C6, 6));
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.C7, 7));
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.C8, 8));
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.C9, 9));
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.C10, 10));
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.CJ, 11));
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.CD, 12));
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.CK, 13));
        cards.add(new PokerCard(CardSuite.CLUBS, CardType.CA, 14));

        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.C2, 2));
        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.C3, 3));
        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.C4, 4));
        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.C5, 5));
        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.C6, 6));
        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.C7, 7));
        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.C8, 8));
        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.C9, 9));
        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.C10, 10));
        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.CJ, 11));
        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.CD, 12));
        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.CK, 13));
        cards.add(new PokerCard(CardSuite.DIAMONDS, CardType.CA, 14));

        cards.add(new PokerCard(CardSuite.HEARTS, CardType.C2, 2));
        cards.add(new PokerCard(CardSuite.HEARTS, CardType.C3, 3));
        cards.add(new PokerCard(CardSuite.HEARTS, CardType.C4, 4));
        cards.add(new PokerCard(CardSuite.HEARTS, CardType.C5, 5));
        cards.add(new PokerCard(CardSuite.HEARTS, CardType.C6, 6));
        cards.add(new PokerCard(CardSuite.HEARTS, CardType.C7, 7));
        cards.add(new PokerCard(CardSuite.HEARTS, CardType.C8, 8));
        cards.add(new PokerCard(CardSuite.HEARTS, CardType.C9, 9));
        cards.add(new PokerCard(CardSuite.HEARTS, CardType.C10, 10));
        cards.add(new PokerCard(CardSuite.HEARTS, CardType.CJ, 11));
        cards.add(new PokerCard(CardSuite.HEARTS, CardType.CD, 12));
        cards.add(new PokerCard(CardSuite.HEARTS, CardType.CK, 13));
        cards.add(new PokerCard(CardSuite.HEARTS, CardType.CA, 14));

        cards.add(new PokerCard(CardSuite.SPADES, CardType.C2, 2));
        cards.add(new PokerCard(CardSuite.SPADES, CardType.C3, 3));
        cards.add(new PokerCard(CardSuite.SPADES, CardType.C4, 4));
        cards.add(new PokerCard(CardSuite.SPADES, CardType.C5, 5));
        cards.add(new PokerCard(CardSuite.SPADES, CardType.C6, 6));
        cards.add(new PokerCard(CardSuite.SPADES, CardType.C7, 7));
        cards.add(new PokerCard(CardSuite.SPADES, CardType.C8, 8));
        cards.add(new PokerCard(CardSuite.SPADES, CardType.C9, 9));
        cards.add(new PokerCard(CardSuite.SPADES, CardType.C10, 10));
        cards.add(new PokerCard(CardSuite.SPADES, CardType.CJ, 11));
        cards.add(new PokerCard(CardSuite.SPADES, CardType.CD, 12));
        cards.add(new PokerCard(CardSuite.SPADES, CardType.CK, 13));
        cards.add(new PokerCard(CardSuite.SPADES, CardType.CA, 14));

        Collections.shuffle(cards);
        return cards;
    }

    public static String deckToString(List<PokerCard> cards) {
        return cards.stream().map(c -> c.getSuite() + "-" + c.getType() + "-" + c.getValue()).collect(Collectors.joining(","));
    }

    public static List<PokerCard> deckFromString(String deck) {
        if (StringHelper.isEmpty(deck)) {
            return new ArrayList<>();
        }
        return Arrays.stream(deck.split(",")).map(c -> {
            String[] cardParts = c.split("-");
            return new PokerCard(CardSuite.valueOf(cardParts[0]), CardType.valueOf(cardParts[1]), Integer.valueOf(cardParts[2]));
        }).collect(Collectors.toList());
    }
}
