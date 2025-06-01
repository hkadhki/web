package org.writer.weborder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.writer.weborder.dto.ItemDtoShow;
import org.writer.weborder.model.ItemEntity;

import java.math.BigDecimal;
import java.util.List;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {
    @Modifying
    @Transactional
    @Query(
            value = """
                    INSERT INTO items ( price_at_purchase, quantity, product_id, order_id)
                    VALUES (:price, :quantity, :productId, :orderId)
                    """,
            nativeQuery = true
    )
    void insertItem(BigDecimal price, Integer quantity, Long productId, Long orderId);


    @Query("""
                SELECT new org.writer.weborder.dto.ItemDtoShow(
                    i.productId,
                    null,
                    i.quantity,
                    i.priceAtPurchase
                ) 
                FROM ItemEntity i
                    where i.order.id = :id
            """)
    List<ItemDtoShow> findDtoByOrder(Long id);
}
