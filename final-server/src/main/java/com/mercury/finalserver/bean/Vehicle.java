package com.mercury.finalserver.bean;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "PRO_VEHICLE")
public class Vehicle {

    @Id
    private long id;
    @Column
    private String type;
    @Column
    private String color;
    @Column
    private String brand;
    @Column
    private String model;
    @Column
    private String year;
    @Column
    private String image;
    @Column
    private String status;
    @Column
    private int price;

    @OneToMany( mappedBy = "vehicle", fetch = FetchType.EAGER)
    private Set<Review> reviewList  = new HashSet<>();

    public Vehicle() {
    }

    public Vehicle(long id, String type, String color, String brand, String model, String year, String image, int price) {
        this.id = id;
        this.type = type;
        this.color = color;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.image = image;
        this.price = price;
    }

    public Set<Review> getReviewList() {
        return reviewList;
    }

    public void setReviewList(Set<Review> reviewList) {
        this.reviewList = reviewList;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Vehicle{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", color='" + color + '\'' +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", year='" + year + '\'' +
                ", image='" + image + '\'' +
                ", status='" + status + '\'' +
                ", price=" + price +
                ", reviewList=" + reviewList +
                '}';
    }
}
