package org.writer.weborder.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private String category;
    private String brand;
    private List<SpecDto> specs;
    private String img;
}
