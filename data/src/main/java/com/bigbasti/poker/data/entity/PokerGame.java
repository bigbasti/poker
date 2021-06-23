package com.bigbasti.poker.data.entity;

import com.bigbasti.poker.data.types.GameType;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;

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
    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private GameType type;
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
    private PokerUser creator;
    @JoinColumn(name = "WINNER", referencedColumnName = "ID")
    @ManyToOne
    private PokerPlayer winner;
    @JoinTable(name = "games_players", joinColumns = {
            @JoinColumn(name = "game", referencedColumnName = "ID")}, inverseJoinColumns = {
            @JoinColumn(name = "player", referencedColumnName = "ID")})
    @ManyToMany
    private Collection<PokerPlayer> players;

    public PokerGame() {
    }

    public PokerGame(Integer id) {
        this.id = id;
    }

    public PokerGame(Integer id, String name, GameType type, LocalDateTime created, int smallBlind, int bigBlind, int idleTime, Collection<PokerPlayer> players) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.created = created;
        this.smallBlind = smallBlind;
        this.bigBlind = bigBlind;
        this.idleTime = idleTime;
        this.players = players;
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

    public GameType getType() {
        return type;
    }

    public void setType(GameType type) {
        this.type = type;
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

    public PokerUser getCreator() {
        return creator;
    }

    public void setCreator(PokerUser creator) {
        this.creator = creator;
    }

    public PokerPlayer getWinner() {
        return winner;
    }

    public void setWinner(PokerPlayer winner) {
        this.winner = winner;
    }

    public Collection<PokerPlayer> getPlayers() {
        return players;
    }

    public void setPlayers(Collection<PokerPlayer> players) {
        this.players = players;
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
                ", type=" + type +
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
                ", winner=" + winner.getUser() +
                ", players=" + players.size() +
                '}';
    }
}

