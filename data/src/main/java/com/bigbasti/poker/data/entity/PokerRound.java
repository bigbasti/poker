package com.bigbasti.poker.data.entity;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author A1528817
 */
@Entity
@Table(name = "rounds", catalog = "poker", schema = "")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "PokerRound.findAll", query = "SELECT p FROM PokerRound p")})
public class PokerRound implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "number")
    private int number;
    @Basic(optional = false)
    @Column(name = "deck")
    private String deck;
    @Column(name = "open_cards")
    private String openCards;
    @Column(name = "pots")
    private String pots;
    @Column(name = "removed_cards")
    private String removedCards;
    @Column(name = "p1_cards")
    private String p1Cards;
    @Column(name = "p2_cards")
    private String p2Cards;
    @Column(name = "p3_cards")
    private String p3Cards;
    @Column(name = "p4_cards")
    private String p4Cards;
    @Column(name = "p5_cards")
    private String p5Cards;
    @Column(name = "p6_cards")
    private String p6Cards;
    @Column(name = "p7_cards")
    private String p7Cards;
    @Column(name = "p8_cards")
    private String p8Cards;
    @Column(name = "current_rurn")
    private Integer currentRurn;
    @Column(name = "finished")
    private Boolean finished;
    @Basic(optional = false)
    @Column(name = "big_blind")
    private int bigBlind;
    @Basic(optional = false)
    @Column(name = "small_blind")
    private int smallBlind;
    @JoinColumn(name = "game", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private PokerGame game;
    @JoinColumn(name = "dealer", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private PokerPlayer dealer;
    @JoinTable(name = "rounds_turns", joinColumns = {
            @JoinColumn(name = "round", referencedColumnName = "ID")}, inverseJoinColumns = {
            @JoinColumn(name = "turn", referencedColumnName = "ID")})
    @ManyToMany
    private Collection<PokerTurn> turns;

    public PokerRound() {
    }

    public PokerRound(Integer id) {
        this.id = id;
    }

    public PokerRound(Integer id, int number, String deck, int bigBlind, int smallBlind, Collection<PokerTurn> turns) {
        this.id = id;
        this.number = number;
        this.deck = deck;
        this.bigBlind = bigBlind;
        this.smallBlind = smallBlind;
        this.turns = turns;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getDeck() {
        return deck;
    }

    public void setDeck(String deck) {
        this.deck = deck;
    }

    public String getOpenCards() {
        return openCards;
    }

    public void setOpenCards(String openCards) {
        this.openCards = openCards;
    }

    public String getPots() {
        return pots;
    }

    public void setPots(String pots) {
        this.pots = pots;
    }

    public String getRemovedCards() {
        return removedCards;
    }

    public void setRemovedCards(String removedCards) {
        this.removedCards = removedCards;
    }

    public String getP1Cards() {
        return p1Cards;
    }

    public void setP1Cards(String p1Cards) {
        this.p1Cards = p1Cards;
    }

    public String getP2Cards() {
        return p2Cards;
    }

    public void setP2Cards(String p2Cards) {
        this.p2Cards = p2Cards;
    }

    public String getP3Cards() {
        return p3Cards;
    }

    public void setP3Cards(String p3Cards) {
        this.p3Cards = p3Cards;
    }

    public String getP4Cards() {
        return p4Cards;
    }

    public void setP4Cards(String p4Cards) {
        this.p4Cards = p4Cards;
    }

    public String getP5Cards() {
        return p5Cards;
    }

    public void setP5Cards(String p5Cards) {
        this.p5Cards = p5Cards;
    }

    public String getP6Cards() {
        return p6Cards;
    }

    public void setP6Cards(String p6Cards) {
        this.p6Cards = p6Cards;
    }

    public String getP7Cards() {
        return p7Cards;
    }

    public void setP7Cards(String p7Cards) {
        this.p7Cards = p7Cards;
    }

    public String getP8Cards() {
        return p8Cards;
    }

    public void setP8Cards(String p8Cards) {
        this.p8Cards = p8Cards;
    }

    public Integer getCurrentRurn() {
        return currentRurn;
    }

    public void setCurrentRurn(Integer currentRurn) {
        this.currentRurn = currentRurn;
    }

    public int getBigBlind() {
        return bigBlind;
    }

    public void setBigBlind(int bigBlind) {
        this.bigBlind = bigBlind;
    }

    public int getSmallBlind() {
        return smallBlind;
    }

    public void setSmallBlind(int smallBlind) {
        this.smallBlind = smallBlind;
    }

    public PokerGame getGame() {
        return game;
    }

    public void setGame(PokerGame game) {
        this.game = game;
    }

    public PokerPlayer getDealer() {
        return dealer;
    }

    public void setDealer(PokerPlayer dealer) {
        this.dealer = dealer;
    }

    public Boolean getFinished() {
        return finished;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }

    public Collection<PokerTurn> getTurns() {
        return turns;
    }

    public void setTurns(Collection<PokerTurn> turns) {
        this.turns = turns;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PokerRound)) {
            return false;
        }
        PokerRound other = (PokerRound) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PokerRound{" +
                "id=" + id +
                ", number=" + number +
                ", deck='" + deck + '\'' +
                ", openCards='" + openCards + '\'' +
                ", pots='" + pots + '\'' +
                ", removedCards='" + removedCards + '\'' +
                ", p1Cards='" + p1Cards + '\'' +
                ", p2Cards='" + p2Cards + '\'' +
                ", p3Cards='" + p3Cards + '\'' +
                ", p4Cards='" + p4Cards + '\'' +
                ", p5Cards='" + p5Cards + '\'' +
                ", p6Cards='" + p6Cards + '\'' +
                ", p7Cards='" + p7Cards + '\'' +
                ", p8Cards='" + p8Cards + '\'' +
                ", currentRurn=" + currentRurn +
                ", bigBlind=" + bigBlind +
                ", finished=" + finished +
                ", smallBlind=" + smallBlind +
                ", game=" + game +
                ", dealer=" + dealer +
                ", turns=" + turns.size() +
                '}';
    }
}
