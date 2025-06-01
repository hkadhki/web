package org.writer.webproduct.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "popular")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class PopularEntity {
    @Id
    private Long id;
}
