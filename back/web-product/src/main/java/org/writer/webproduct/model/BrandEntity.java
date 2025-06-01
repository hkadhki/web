package org.writer.webproduct.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "brands")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class BrandEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column
    private String country;
}
