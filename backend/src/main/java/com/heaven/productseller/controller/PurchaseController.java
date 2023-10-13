package com.heaven.productseller.controller;

import com.heaven.productseller.model.Purchase;
import com.heaven.productseller.security.UserPrincipal;
import com.heaven.productseller.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<?> savePurchase(@RequestBody Purchase purchase, @AuthenticationPrincipal UserPrincipal userPrincipal,@RequestParam("productId") Long productId){
        return new ResponseEntity<>(purchaseService.savePurchase(purchase,userPrincipal.getId(),productId), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllPurchaseFromUser(@AuthenticationPrincipal UserPrincipal userPrincipal){
        return new ResponseEntity<>(purchaseService.getAllPurchasesByUser(userPrincipal.getId()),HttpStatus.OK);
    }
}
