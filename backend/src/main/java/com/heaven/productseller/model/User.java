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
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true, nullable = false, length = 100)
    private String username;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "create_time", nullable = false)
    private LocalDateTime createTime;
    @Enumerated(value = EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<Purchase> purchaseList = new ArrayList<>();

    @Transient
    private String token;

    public void addPurchase(Purchase purchase) {
        this.purchaseList.add(purchase);

    }

}
