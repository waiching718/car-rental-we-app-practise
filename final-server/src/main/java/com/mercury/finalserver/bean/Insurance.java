package com.mercury.finalserver.bean;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table( name = "PRO_INSURANCE")
public class Insurance {
    @Id
    private long id;
    @Column
    private String type;
    @Column
    private int price;

    public Insurance() {
    }

    public Insurance(long id, String type, int price) {
        this.id = id;
        this.type = type;
        this.price = price;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Insurance{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", price=" + price +
                '}';
    }
}
