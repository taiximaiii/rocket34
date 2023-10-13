package com.heaven.productseller.repository;

import com.heaven.productseller.model.Purchase;
import com.heaven.productseller.repository.projection.PurchaseItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase,Long> {

    @Query("select prd.name as name, pur.price as price, pur.purchaseTime as purchaseTime from Purchase pur left join Product prd on prd.id=pur.product.id where pur.user.id =:userId")
    List<PurchaseItem> findAllPurchasesOfUser(@Param("userId") Long userId);

}
