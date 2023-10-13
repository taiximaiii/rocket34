package com.heaven.productseller.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "price", nullable = false)
    private Double price;
    @Column(name = "create_time", nullable = false)
    private LocalDateTime createTime;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    private List<Purchase> purchaseList = new ArrayList<>();

    public void addPurchase(Purchase purchase) {
        this.purchaseList.add(purchase);
    }
}
