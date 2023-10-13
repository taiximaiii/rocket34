package com.heaven.productseller.service;

import com.heaven.productseller.model.Product;
import com.heaven.productseller.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public Product saveProduct(Product product) {
        product.setCreateTime(LocalDateTime.now());
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> findAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product editProduct(Product product, Long id) {
        Product editProduct = getProductById(id);
        editProduct.setName(product.getName());
        editProduct.setDescription(product.getDescription());
        editProduct.setPrice(product.getPrice());
        editProduct.setCreateTime(LocalDateTime.now());
        return productRepository.save(editProduct);
    }


}
