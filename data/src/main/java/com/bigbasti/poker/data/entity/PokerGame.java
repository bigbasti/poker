package com.bigbasti.poker.data.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

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
    @Column(name = "CREATOR")
    private String creator;
    @Basic(optional = false)
    @Column(name = "CREATED")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime created;
    @Column(name = "FINISHED")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime finished;
    @Basic(optional = false)
    @Column(name = "STATE")
    private String state;
    @Basic(optional = false)
    @Column(name = "PLAYER1")
    private String player1;
    @Basic(optional = false)
    @Column(name = "PLAYER2")
    private String player2;
    @Column(name = "PLAYER3")
    private String player3;
    @Column(name = "PLAYER4")
    private String player4;
    @Column(name = "PLAYER5")
    private String player5;
    @Column(name = "PLAYER6")
    private String player6;
    @Column(name = "PLAYER7")
    private String player7;
    @Column(name = "PLAYER8")
    private String player8;
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
    @Column(name = "WINNER")
    private String winner;
    @Column(name = "GAME_TIME")
    private Integer gameTime;
    @Column(name = "GAME_ROUNDS")
    private Integer gameRounds;

    public PokerGame() {
    }

    public PokerGame(Integer id) {
        this.id = id;
    }

    public PokerGame(Integer id, String name, String creator, LocalDateTime created, String state, String player1, String player2, int smallBlind, int bigBlind, int idleTime) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.created = created;
        this.state = state;
        this.player1 = player1;
        this.player2 = player2;
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

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPlayer1() {
        return player1;
    }

    public void setPlayer1(String player1) {
        this.player1 = player1;
    }

    public String getPlayer2() {
        return player2;
    }

    public void setPlayer2(String player2) {
        this.player2 = player2;
    }

    public String getPlayer3() {
        return player3;
    }

    public void setPlayer3(String player3) {
        this.player3 = player3;
    }

    public String getPlayer4() {
        return player4;
    }

    public void setPlayer4(String player4) {
        this.player4 = player4;
    }

    public String getPlayer5() {
        return player5;
    }

    public void setPlayer5(String player5) {
        this.player5 = player5;
    }

    public String getPlayer6() {
        return player6;
    }

    public void setPlayer6(String player6) {
        this.player6 = player6;
    }

    public String getPlayer7() {
        return player7;
    }

    public void setPlayer7(String player7) {
        this.player7 = player7;
    }

    public String getPlayer8() {
        return player8;
    }

    public void setPlayer8(String player8) {
        this.player8 = player8;
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

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
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
                ", creator='" + creator + '\'' +
                ", created=" + created +
                ", finished=" + finished +
                ", state='" + state + '\'' +
                ", player1='" + player1 + '\'' +
                ", player2='" + player2 + '\'' +
                ", player3='" + player3 + '\'' +
                ", player4='" + player4 + '\'' +
                ", player5='" + player5 + '\'' +
                ", player6='" + player6 + '\'' +
                ", player7='" + player7 + '\'' +
                ", player8='" + player8 + '\'' +
                ", smallBlind=" + smallBlind +
                ", bigBlind=" + bigBlind +
                ", intervallTime=" + intervallTime +
                ", intervallRounds=" + intervallRounds +
                ", startingMoney=" + startingMoney +
                ", idleTime=" + idleTime +
                ", winner='" + winner + '\'' +
                ", gameTime=" + gameTime +
                ", gameRounds=" + gameRounds +
                '}';
    }
}

