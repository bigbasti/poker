package com.bigbasti.poker.api.model;

public class RegisterUserModel {
    String email;
    String name;
    String pass1;
    String pass2;
    String gender;

    public RegisterUserModel() {
    }

    public RegisterUserModel(String email, String name, String pass1, String pass2, String gender) {
        this.email = email;
        this.name = name;
        this.pass1 = pass1;
        this.pass2 = pass2;
        this.gender = gender;
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

    public String getPass1() {
        return pass1;
    }

    public void setPass1(String pass1) {
        this.pass1 = pass1;
    }

    public String getPass2() {
        return pass2;
    }

    public void setPass2(String pass2) {
        this.pass2 = pass2;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "RegisterUserModel{" +
                "email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", pass1='" + pass1 + '\'' +
                ", pass2='" + pass2 + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
