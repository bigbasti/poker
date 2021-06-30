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
@Table(name = "turns", catalog = "poker", schema = "")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "PokerTurn.findAll", query = "SELECT p FROM PokerTurn p")})
public class PokerTurn implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "type")
    private String type;
    @Basic(optional = false)
    @Column(name = "finished")
    private short finished;
    @Column(name = "p1_bet")
    private String p1Bet;
    @Column(name = "p2_bet")
    private String p2Bet;
    @Column(name = "p3_bet")
    private String p3Bet;
    @Column(name = "p4_bet")
    private String p4Bet;
    @Column(name = "p5_bet")
    private String p5Bet;
    @Column(name = "p6_bet")
    private String p6Bet;
    @Column(name = "p7_bet")
    private String p7Bet;
    @Column(name = "p8_bet")
    private String p8Bet;
    @JoinColumn(name = "player_turn", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private PokerPlayer playerTurn;

    public PokerTurn() {
    }

    public PokerTurn(Integer id) {
        this.id = id;
    }

    public PokerTurn(Integer id, String type, short finished) {
        this.id = id;
        this.type = type;
        this.finished = finished;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public short getFinished() {
        return finished;
    }

    public void setFinished(short finished) {
        this.finished = finished;
    }

    public String getP1Bet() {
        return p1Bet;
    }

    public void setP1Bet(String p1Bet) {
        this.p1Bet = p1Bet;
    }

    public String getP2Bet() {
        return p2Bet;
    }

    public void setP2Bet(String p2Bet) {
        this.p2Bet = p2Bet;
    }

    public String getP3Bet() {
        return p3Bet;
    }

    public void setP3Bet(String p3Bet) {
        this.p3Bet = p3Bet;
    }

    public String getP4Bet() {
        return p4Bet;
    }

    public void setP4Bet(String p4Bet) {
        this.p4Bet = p4Bet;
    }

    public String getP5Bet() {
        return p5Bet;
    }

    public void setP5Bet(String p5Bet) {
        this.p5Bet = p5Bet;
    }

    public String getP6Bet() {
        return p6Bet;
    }

    public void setP6Bet(String p6Bet) {
        this.p6Bet = p6Bet;
    }

    public String getP7Bet() {
        return p7Bet;
    }

    public void setP7Bet(String p7Bet) {
        this.p7Bet = p7Bet;
    }

    public String getP8Bet() {
        return p8Bet;
    }

    public void setP8Bet(String p8Bet) {
        this.p8Bet = p8Bet;
    }

    public PokerPlayer getPlayerTurn() {
        return playerTurn;
    }

    public void setPlayerTurn(PokerPlayer playerTurn) {
        this.playerTurn = playerTurn;
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
        if (!(object instanceof PokerTurn)) {
            return false;
        }
        PokerTurn other = (PokerTurn) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PokerTurn{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", finished=" + finished +
                ", p1Bet='" + p1Bet + '\'' +
                ", p2Bet='" + p2Bet + '\'' +
                ", p3Bet='" + p3Bet + '\'' +
                ", p4Bet='" + p4Bet + '\'' +
                ", p5Bet='" + p5Bet + '\'' +
                ", p6Bet='" + p6Bet + '\'' +
                ", p7Bet='" + p7Bet + '\'' +
                ", p8Bet='" + p8Bet + '\'' +
                ", playerTurn=" + playerTurn +
                '}';
    }
}

