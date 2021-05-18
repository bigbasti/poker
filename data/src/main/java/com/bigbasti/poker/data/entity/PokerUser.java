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
    @Column(name = "PASS")
    private String pass;
    @Basic(optional = false)
    @Column(name = "ADMIN")
    private Boolean admin;

    public PokerUser() {
    }

    public PokerUser(Integer id) {
        this.id = id;
    }

    public PokerUser(Integer id, String email, String name, String pass, Boolean admin) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.pass = pass;
        this.admin = admin;
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

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public String toString() {
        return "PokerUser{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", admin=" + admin +
                '}';
    }
}
