package org.writer.weborder.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.writer.weborder.dto.OrdersDtoShow;
import org.writer.weborder.model.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {



    @Query("""
                SELECT new org.writer.weborder.dto.OrdersDtoShow(
                    o.id, 
                    o.email,
                    o.status,
                    o.totalAmount, 
                    null 
                ) 
                FROM OrderEntity o
                    where o.email = :email
            """)
    Page<OrdersDtoShow> findDtoByEmail(String email, Pageable pageable);

    @Query("""
                SELECT new org.writer.weborder.dto.OrdersDtoShow(
                    o.id, 
                    o.email,
                    o.status,
                    o.totalAmount, 
                    null 
                ) 
                FROM OrderEntity o
                    where o.id = :id
            """)
    OrdersDtoShow findDtoById(Long id);
}
