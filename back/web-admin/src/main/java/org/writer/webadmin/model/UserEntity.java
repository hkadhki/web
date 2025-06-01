package org.writer.webadmin.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;



@Table(name = "users")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 30)
    private String email;

    @Column(nullable = false)
    private String password;


}
