package com.heaven.productseller.service;

import com.heaven.productseller.model.User;

public interface AuthenticationService {
    User signInAndReturnJWT(User signInRequest);

}
