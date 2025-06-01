package org.writer.weborder.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.writer.weborder.model.Status;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
public class OrdersDtoShow {
    private Long id;
    private String email;
    private String status;
    private BigDecimal totalAmount;
    private List<ItemDtoShow> items;
}
