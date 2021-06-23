package com.bigbasti.poker.data.entity;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@Entity
@Table(name = "players", catalog = "poker", schema = "")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "PokerPlayer.findAll", query = "SELECT p FROM PokerPlayer p")})
public class PokerPlayer implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "money")
    private int money;
    @Column(name = "card1")
    private String card1;
    @Column(name = "card2")
    private String card2;
    @Column(name = "user")
    private Integer user;

    public PokerPlayer() {
    }

    public PokerPlayer(Integer id) {
        this.id = id;
    }

    public PokerPlayer(Integer id, int money) {
        this.id = id;
        this.money = money;
    }

    public PokerPlayer(PokerUser user, int money) {
        this.money = money;
        this.user = user.getId();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }

    public String getCard1() {
        return card1;
    }

    public void setCard1(String card1) {
        this.card1 = card1;
    }

    public String getCard2() {
        return card2;
    }

    public void setCard2(String card2) {
        this.card2 = card2;
    }

    public Integer getUser() {
        return user;
    }

    public void setUser(Integer user) {
        this.user = user;
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
        if (!(object instanceof PokerPlayer)) {
            return false;
        }
        PokerPlayer other = (PokerPlayer) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PokerPlayer{" +
                "id=" + id +
                ", money=" + money +
                ", card1='" + card1 + '\'' +
                ", card2='" + card2 + '\'' +
                ", user=" + user +
                '}';
    }
}
