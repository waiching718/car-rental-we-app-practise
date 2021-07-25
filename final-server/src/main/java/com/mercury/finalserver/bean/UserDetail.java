package com.mercury.finalserver.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mercury.finalserver.bean.User;

import javax.persistence.*;

@Entity
@Table(name="PRO_USER_DETAIL")
public class UserDetail {

    @Id
    private long id;
    @Column
    private String name;

    @Column
    private String phone;
    @Column
    private String email;
    @Column
    private String address;
    @Column
    private String city;
    @Column
    private String state;
    @Column
    private String zip;

    @OneToOne
    @JoinColumn(name = "USER_ID", referencedColumnName = "ID")
    @JsonIgnore
    User user;

    public UserDetail() {
    }

    public UserDetail(long id) {
        this.id = id;
        this.name = "null";
        this.phone = "null";
        this.email = "null";
        this.address = "null";
        this.city = "null";
        this.state = "null";
        this.zip = "null";
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "UserDetail{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zip='" + zip + '\'' +
                ", user=" + user +
                '}';
    }
}
