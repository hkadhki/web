package org.writer.weborder.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;

@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    @Positive
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private String email;

    @Column
    private String status;

    @Column
    private Date createdAt;

    @Column
    private Date updatedAt;

}
