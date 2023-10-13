package com.heaven.productseller.service;

import com.heaven.productseller.model.Role;
import com.heaven.productseller.model.User;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);

    Optional<User> findByUsername(String username);

    public void changeRole(Role newRole,String username);
}
