package com.heaven.productseller.service;

import com.heaven.productseller.model.Purchase;
import com.heaven.productseller.repository.projection.PurchaseItem;

import java.util.List;

public interface PurchaseService {
    Purchase savePurchase(Purchase purchase,Long userId,Long productId);
    List<PurchaseItem> getAllPurchasesByUser(Long userId);
}
