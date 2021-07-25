package com.mercury.finalserver.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "PRO_REVIEW")
public class Review {

    @Id
    private long id;

    @ManyToOne
    @JoinColumn( name = "USER_ID", referencedColumnName = "id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn ( name = "VEHICLE_ID", referencedColumnName = "id")
    @JsonIgnore
    private Vehicle vehicle;

    @Column
    private String comments;

    public Review() {
    }

    public Review(long id, User user, Vehicle vehicle, String comments) {
        this.id = id;
        this.user = user;
        this.vehicle = vehicle;
        this.comments = comments;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
