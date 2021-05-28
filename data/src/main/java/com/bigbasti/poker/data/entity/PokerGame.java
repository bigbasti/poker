package com.bigbasti.poker.data.entity;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "games", catalog = "poker")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "PokerGame.findAll", query = "SELECT p FROM PokerGame p")})
public class PokerGame implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "NAME")
    private String name;
    @Basic(optional = false)
    @Column(name = "CREATED")
    private LocalDateTime created;
    @Column(name = "FINISHED")
    private LocalDateTime finished;
    @Basic(optional = false)
    @Column(name = "SMALL_BLIND")
    private int smallBlind;
    @Basic(optional = false)
    @Column(name = "BIG_BLIND")
    private int bigBlind;
    @Column(name = "INTERVALL_TIME")
    private Integer intervallTime;
    @Column(name = "INTERVALL_ROUNDS")
    private Integer intervallRounds;
    @Column(name = "STARTING_MONEY")
    private Integer startingMoney;
    @Basic(optional = false)
    @Column(name = "IDLE_TIME")
    private int idleTime;
    @Column(name = "GAME_TIME")
    private Integer gameTime;
    @Column(name = "GAME_ROUNDS")
    private Integer gameRounds;
    @JoinColumn(name = "CREATOR", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private PokerPlayer creator;
    @JoinColumn(name = "PLAYER1", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private PokerPlayer player1;
    @JoinColumn(name = "PLAYER2", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private PokerPlayer player2;
    @JoinColumn(name = "PLAYER3", referencedColumnName = "ID")
    @ManyToOne
    private PokerPlayer player3;
    @JoinColumn(name = "PLAYER4", referencedColumnName = "ID")
    @ManyToOne
    private PokerPlayer player4;
    @JoinColumn(name = "PLAYER5", referencedColumnName = "ID")
    @ManyToOne
    private PokerPlayer player5;
    @JoinColumn(name = "PLAYER6", referencedColumnName = "ID")
    @ManyToOne
    private PokerPlayer player6;
    @JoinColumn(name = "PLAYER7", referencedColumnName = "ID")
    @ManyToOne
    private PokerPlayer player7;
    @JoinColumn(name = "PLAYER8", referencedColumnName = "ID")
    @ManyToOne
    private PokerPlayer player8;
    @JoinColumn(name = "WINNER", referencedColumnName = "ID")
    @ManyToOne
    private PokerPlayer winner;

    public PokerGame() {
    }

    public PokerGame(Integer id) {
        this.id = id;
    }

    public PokerGame(Integer id, String name, LocalDateTime created, int smallBlind, int bigBlind, int idleTime) {
        this.id = id;
        this.name = name;
        this.created = created;
        this.smallBlind = smallBlind;
        this.bigBlind = bigBlind;
        this.idleTime = idleTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public LocalDateTime getFinished() {
        return finished;
    }

    public void setFinished(LocalDateTime finished) {
        this.finished = finished;
    }

    public int getSmallBlind() {
        return smallBlind;
    }

    public void setSmallBlind(int smallBlind) {
        this.smallBlind = smallBlind;
    }

    public int getBigBlind() {
        return bigBlind;
    }

    public void setBigBlind(int bigBlind) {
        this.bigBlind = bigBlind;
    }

    public Integer getIntervallTime() {
        return intervallTime;
    }

    public void setIntervallTime(Integer intervallTime) {
        this.intervallTime = intervallTime;
    }

    public Integer getIntervallRounds() {
        return intervallRounds;
    }

    public void setIntervallRounds(Integer intervallRounds) {
        this.intervallRounds = intervallRounds;
    }

    public Integer getStartingMoney() {
        return startingMoney;
    }

    public void setStartingMoney(Integer startingMoney) {
        this.startingMoney = startingMoney;
    }

    public int getIdleTime() {
        return idleTime;
    }

    public void setIdleTime(int idleTime) {
        this.idleTime = idleTime;
    }

    public Integer getGameTime() {
        return gameTime;
    }

    public void setGameTime(Integer gameTime) {
        this.gameTime = gameTime;
    }

    public Integer getGameRounds() {
        return gameRounds;
    }

    public void setGameRounds(Integer gameRounds) {
        this.gameRounds = gameRounds;
    }

    public PokerPlayer getCreator() {
        return creator;
    }

    public void setCreator(PokerPlayer creator) {
        this.creator = creator;
    }

    public PokerPlayer getPlayer1() {
        return player1;
    }

    public void setPlayer1(PokerPlayer player1) {
        this.player1 = player1;
    }

    public PokerPlayer getPlayer2() {
        return player2;
    }

    public void setPlayer2(PokerPlayer player2) {
        this.player2 = player2;
    }

    public PokerPlayer getPlayer3() {
        return player3;
    }

    public void setPlayer3(PokerPlayer player3) {
        this.player3 = player3;
    }

    public PokerPlayer getPlayer4() {
        return player4;
    }

    public void setPlayer4(PokerPlayer player4) {
        this.player4 = player4;
    }

    public PokerPlayer getPlayer5() {
        return player5;
    }

    public void setPlayer5(PokerPlayer player5) {
        this.player5 = player5;
    }

    public PokerPlayer getPlayer6() {
        return player6;
    }

    public void setPlayer6(PokerPlayer player6) {
        this.player6 = player6;
    }

    public PokerPlayer getPlayer7() {
        return player7;
    }

    public void setPlayer7(PokerPlayer player7) {
        this.player7 = player7;
    }

    public PokerPlayer getPlayer8() {
        return player8;
    }

    public void setPlayer8(PokerPlayer player8) {
        this.player8 = player8;
    }

    public PokerPlayer getWinner() {
        return winner;
    }

    public void setWinner(PokerPlayer winner) {
        this.winner = winner;
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
        if (!(object instanceof PokerGame)) {
            return false;
        }
        PokerGame other = (PokerGame) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PokerGame{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", created=" + created +
                ", finished=" + finished +
                ", smallBlind=" + smallBlind +
                ", bigBlind=" + bigBlind +
                ", intervallTime=" + intervallTime +
                ", intervallRounds=" + intervallRounds +
                ", startingMoney=" + startingMoney +
                ", idleTime=" + idleTime +
                ", gameTime=" + gameTime +
                ", gameRounds=" + gameRounds +
                ", creator=" + creator +
                ", player1=" + player1 +
                ", player2=" + player2 +
                ", player3=" + player3 +
                ", player4=" + player4 +
                ", player5=" + player5 +
                ", player6=" + player6 +
                ", player7=" + player7 +
                ", player8=" + player8 +
                ", winner=" + winner +
                '}';
    }
}

