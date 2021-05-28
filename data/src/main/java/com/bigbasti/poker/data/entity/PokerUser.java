package com.bigbasti.poker.data.entity;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@Entity
@Table(name = "users", catalog = "poker", schema = "")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "PokerUser.findAll", query = "SELECT p FROM PokerUser p")})
public class PokerUser implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "EMAIL")
    private String email;
    @Basic(optional = false)
    @Column(name = "NAME")
    private String name;
    @Basic(optional = false)
    @Column(name = "ADMIN")
    private short admin;
    @Basic(optional = false)
    @Column(name = "PASS")
    private String pass;

    public PokerUser() {
    }

    public PokerUser(Integer id) {
        this.id = id;
    }

    public PokerUser(Integer id, String email, String name, short admin, String pass) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.admin = admin;
        this.pass = pass;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public short getAdmin() {
        return admin;
    }

    public void setAdmin(short admin) {
        this.admin = admin;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
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
        if (!(object instanceof PokerUser)) {
            return false;
        }
        PokerUser other = (PokerUser) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PokerUser{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", admin=" + admin +
                ", pass='" + pass + '\'' +
                '}';
    }
}
