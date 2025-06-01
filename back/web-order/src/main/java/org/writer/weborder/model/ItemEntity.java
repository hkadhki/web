package org.writer.weborder.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Table(name = "items")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class ItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private Long productId;

    @Column()
    @PositiveOrZero
    private Integer quantity;

    @Column()
    @Positive
    private BigDecimal priceAtPurchase;

    @ManyToOne
    private OrderEntity order;

    public ItemEntity(Long productId, Integer quantity, BigDecimal priceAtPurchase, OrderEntity order) {
        this.productId = productId;
        this.quantity = quantity;
        this.priceAtPurchase = priceAtPurchase;
        this.order = order;
    }
}
