package org.writer.weborder.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrdersDtoCreate {
    private String email;
    private BigDecimal totalAmount;
    private List<ItemDto> items;
}
