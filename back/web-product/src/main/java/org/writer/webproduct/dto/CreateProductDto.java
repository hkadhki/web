package org.writer.webproduct.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CreateProductDto {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private Integer categoryId;
    private Integer brandId;
    private List<SpecDto> specs;
    private String img;
}
