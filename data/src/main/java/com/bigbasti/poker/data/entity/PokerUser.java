package com.bigbasti.poker.data.entity;

public class PokerUser {
    private String name;
    private String email;
    private String pass;
    private Boolean admin;

    public PokerUser() {
    }

    public PokerUser(String name, String email, String pass, Boolean admin) {
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.admin = admin;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public Boolean isAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }
}
