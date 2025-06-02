package org.writer.webproduct.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CreateProductDto {
    private String title;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private String category;
    private String brand;
    private List<SpecDto> specs;
    private String img;
}
