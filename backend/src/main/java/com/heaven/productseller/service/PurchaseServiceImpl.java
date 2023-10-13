package com.heaven.productseller.service;

import com.heaven.productseller.model.Product;
import com.heaven.productseller.model.Purchase;
import com.heaven.productseller.model.User;
import com.heaven.productseller.repository.ProductRepository;
import com.heaven.productseller.repository.PurchaseRepository;
import com.heaven.productseller.repository.UserRepository;
import com.heaven.productseller.repository.projection.PurchaseItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseServiceImpl implements PurchaseService {
    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public Purchase savePurchase(Purchase purchase, Long userId, Long productId) {
        purchase.setPurchaseTime(LocalDateTime.now());
        User user = userRepository.findById(userId).get();
        Product product = productRepository.findById(productId).get();
        purchase.setUser(user);
        purchase.setProduct(product);
        Purchase saved = purchaseRepository.save(purchase);
        user.addPurchase(saved);
        product.addPurchase(saved);
        userRepository.save(user);
        productRepository.save(product);
        return saved;

    }

    @Override
    public List<PurchaseItem> getAllPurchasesByUser(Long userId) {
        return purchaseRepository.findAllPurchasesOfUser(userId);
    }
}
