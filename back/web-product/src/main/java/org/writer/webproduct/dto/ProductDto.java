package org.writer.webproduct.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
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
