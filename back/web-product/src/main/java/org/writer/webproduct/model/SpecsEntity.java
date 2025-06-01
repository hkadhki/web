package org.writer.webproduct.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "specs")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class SpecsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String value;

    @ManyToOne
    private ProductEntity product;

    public SpecsEntity(String name, String value, ProductEntity product) {
        this.name = name;
        this.value = value;
        this.product = product;
    }
}
