package org.writer.webproduct.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;

@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String title;

    @Column
    private String description;

    @Column()
    @Positive
    private BigDecimal price;

    @Column()
    @PositiveOrZero
    private Integer stockQuantity;

    @Column
    private String img;

    @Column
    private Date createdAt;

    @Column
    private Date updatedAt;

    @ManyToOne
    private CategoryEntity category;

    @ManyToOne
    private BrandEntity brand;

    @Column
    private boolean deleted;

}
