package com.mercury.finalserver.bean;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import oracle.sql.DATE;

import javax.persistence.*;
import java.util.*;

@Entity
@Table ( name = "PRO_ORDER")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "PRO_ORDER_SEQ_GEN")
    @SequenceGenerator(name = "PRO_ORDER_SEQ_GEN", sequenceName = "PRO_ORDER_SEQ", allocationSize = 1)
    private long id;
    @Column
    private String order_Date;
    @Column
    private String start_Date;
    @Column
    private String end_Date;
    @Column
    String status;

    @ManyToOne
    @JoinColumn ( name = "USER_ID", referencedColumnName = "id")
    @JsonBackReference
    User user;

    @ManyToOne
    @JoinColumn ( name = "VEHICLE_ID",referencedColumnName = "id")
    Vehicle vehicle;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "PRO_ORDER_PRO_SERVICE", joinColumns = {
            @JoinColumn(name = "ORDER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name="SERVICE_ID", referencedColumnName = "ID")}
    )
    Set<ExtraService> services = new HashSet<ExtraService>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "PRO_ORDER_PRO_INSURANCE", joinColumns = {
            @JoinColumn(name = "ORDER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name="INSURANCE_ID", referencedColumnName = "ID")}
    )
    Set<Insurance> insurances = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "PRO_ORDER_PRO_PENALTY", joinColumns = {
            @JoinColumn(name = "ORDER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name="PENALTY_ID", referencedColumnName = "ID")}
    )
    Set<Penalty> penalties = new HashSet<>();


    @Column
    private int total;

    public Order() {
    }

    public Order(long id, String order_Date, String start_Date, String end_Date, String status, User user, Vehicle vehicle, Set<ExtraService> services, Set<Insurance> insurances, Set<Penalty> penalties, int total) {
        this.id = id;
        this.order_Date = order_Date;
        this.start_Date = start_Date;
        this.end_Date = end_Date;
        this.status = status;
        this.user = user;
        this.vehicle = vehicle;
        this.services = services;
        this.insurances = insurances;
        this.penalties = penalties;
        this.total = total;
    }

    public Set<Penalty> getPenalties() {
        return penalties;
    }

    public void setPenalties(Set<Penalty> penalties) {
        this.penalties = penalties;
    }

    public Set<Insurance> getInsurances() {
        return insurances;
    }

    public void setInsurances(Set<Insurance> insurances) {
        this.insurances = insurances;
    }

    public Set<ExtraService> getServices() {
        return services;
    }

    public void setServices(Set<ExtraService> services) {
        this.services = services;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOrder_Date() {
        return order_Date;
    }

    public void setOrder_Date(String order_Date) {
        this.order_Date = order_Date;
    }

    public String getStart_Date() {
        return start_Date;
    }

    public void setStart_Date(String start_Date) {
        this.start_Date = start_Date;
    }

    public String getEnd_Date() {
        return end_Date;
    }

    public void setEnd_Date(String end_Date) {
        this.end_Date = end_Date;
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

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", order_Date='" + order_Date + '\'' +
                ", start_Date='" + start_Date + '\'' +
                ", end_Date='" + end_Date + '\'' +
                ", status='" + status + '\'' +
                ", user=" + user +
                ", vehicle=" + vehicle +
                ", services=" + services +
                ", total=" + total +
                '}';
    }
}
