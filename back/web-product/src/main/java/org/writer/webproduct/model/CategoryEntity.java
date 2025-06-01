package org.writer.webproduct.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "categories")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column
    private String description;
}
