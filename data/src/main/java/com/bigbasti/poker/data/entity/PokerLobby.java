package com.bigbasti.poker.data.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author A1528817
 */
@Entity
@Table(name = "lobbies", catalog = "poker", schema = "")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "PokerLobby.findAll", query = "SELECT p FROM PokerLobby p")})
public class PokerLobby implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @Column(name = "type")
    private String type;
    @Basic(optional = false)
    @Column(name = "money")
    private int money;
    @Basic(optional = false)
    @Column(name = "small_blind")
    private int smallBlind;
    @Basic(optional = false)
    @Column(name = "big_blind")
    private int bigBlind;
    @Column(name = "interval_rounds")
    private Integer intervalRounds;
    @Column(name = "interval_time")
    private Integer intervalTime;
    @Basic(optional = false)
    @Column(name = "idle_time")
    private int idleTime;
    @JoinColumn(name = "creator", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private PokerUser creator;
    @JoinColumn(name = "player1", referencedColumnName = "ID")
    @ManyToOne
    private PokerUser player1;
    @JoinColumn(name = "player2", referencedColumnName = "ID")
    @ManyToOne
    private PokerUser player2;
    @JoinColumn(name = "player3", referencedColumnName = "ID")
    @ManyToOne
    private PokerUser player3;
    @JoinColumn(name = "player4", referencedColumnName = "ID")
    @ManyToOne
    private PokerUser player4;
    @JoinColumn(name = "player5", referencedColumnName = "ID")
    @ManyToOne
    private PokerUser player5;
    @JoinColumn(name = "player6", referencedColumnName = "ID")
    @ManyToOne
    private PokerUser player6;
    @JoinColumn(name = "player7", referencedColumnName = "ID")
    @ManyToOne
    private PokerUser player7;
    @JoinColumn(name = "player8", referencedColumnName = "ID")
    @ManyToOne
    private PokerUser player8;

    public PokerLobby() {
    }

    public PokerLobby(Integer id) {
        this.id = id;
    }

    public PokerLobby(Integer id, String name, String type, int money, int smallBlind, int bigBlind, int idleTime) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.money = money;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
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

    public Integer getIntervalRounds() {
        return intervalRounds;
    }

    public void setIntervalRounds(Integer intervalRounds) {
        this.intervalRounds = intervalRounds;
    }

    public Integer getIntervalTime() {
        return intervalTime;
    }

    public void setIntervalTime(Integer intervalTime) {
        this.intervalTime = intervalTime;
    }

    public int getIdleTime() {
        return idleTime;
    }

    public void setIdleTime(int idleTime) {
        this.idleTime = idleTime;
    }

    public PokerUser getCreator() {
        return creator;
    }

    public void setCreator(PokerUser creator) {
        this.creator = creator;
    }

    public PokerUser getPlayer1() {
        return player1;
    }

    public void setPlayer1(PokerUser player1) {
        this.player1 = player1;
    }

    public PokerUser getPlayer2() {
        return player2;
    }

    public void setPlayer2(PokerUser player2) {
        this.player2 = player2;
    }

    public PokerUser getPlayer3() {
        return player3;
    }

    public void setPlayer3(PokerUser player3) {
        this.player3 = player3;
    }

    public PokerUser getPlayer4() {
        return player4;
    }

    public void setPlayer4(PokerUser player4) {
        this.player4 = player4;
    }

    public PokerUser getPlayer5() {
        return player5;
    }

    public void setPlayer5(PokerUser player5) {
        this.player5 = player5;
    }

    public PokerUser getPlayer6() {
        return player6;
    }

    public void setPlayer6(PokerUser player6) {
        this.player6 = player6;
    }

    public PokerUser getPlayer7() {
        return player7;
    }

    public void setPlayer7(PokerUser player7) {
        this.player7 = player7;
    }

    public PokerUser getPlayer8() {
        return player8;
    }

    public void setPlayer8(PokerUser player8) {
        this.player8 = player8;
    }

    public void addPlayer(PokerUser user) {
        if (
            player1.getEmail().equals(user.getEmail()) ||
            player2.getEmail().equals(user.getEmail()) ||
            player3.getEmail().equals(user.getEmail()) ||
            player4.getEmail().equals(user.getEmail()) ||
            player5.getEmail().equals(user.getEmail()) ||
            player6.getEmail().equals(user.getEmail()) ||
            player7.getEmail().equals(user.getEmail()) ||
            player8.getEmail().equals(user.getEmail())
        ) { return; }

        if (player1 == null) {
            player1 = user;
            return;
        }
        if (player2 == null) {
            player2 = user;
            return;
        }
        if (player3 == null) {
            player3 = user;
            return;
        }
        if (player4 == null) {
            player4 = user;
            return;
        }
        if (player5 == null) {
            player5 = user;
            return;
        }
        if (player6 == null) {
            player6 = user;
            return;
        }
        if (player7 == null) {
            player7 = user;
            return;
        }
        if (player8 == null) {
            player8 = user;
            return;
        }
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
        if (!(object instanceof PokerLobby)) {
            return false;
        }
        PokerLobby other = (PokerLobby) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PokerLobby{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", money=" + money +
                ", smallBlind=" + smallBlind +
                ", bigBlind=" + bigBlind +
                ", intervalRounds=" + intervalRounds +
                ", intervalTime=" + intervalTime +
                ", idleTime=" + idleTime +
                ", creator=" + creator.getEmail() +
                ", player1=" + player1.getEmail() +
                ", player2=" + player2.getEmail() +
                ", player3=" + player3.getEmail() +
                ", player4=" + player4.getEmail() +
                ", player5=" + player5.getEmail() +
                ", player6=" + player6.getEmail() +
                ", player7=" + player7.getEmail() +
                ", player8=" + player8.getEmail() +
                '}';
    }
}

