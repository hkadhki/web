package org.writer.weborder.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ItemDto {
    private Long productId;
    private Integer quantity;
    private BigDecimal priceAtPurchase;
}
