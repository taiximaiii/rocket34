package com.heaven.productseller.service;

import com.heaven.productseller.model.Product;

import java.util.List;

public interface ProductService {
    Product saveProduct(Product product);

    void deleteById(Long id);

    List<Product> findAllProduct();

    Product getProductById(Long id);

    Product editProduct(Product product,Long id);
}
