package org.writer.webproduct.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.writer.webproduct.dto.SpecDto;
import org.writer.webproduct.model.SpecsEntity;

import java.util.List;

public interface SpecRepository extends JpaRepository<SpecsEntity, Long> {

    @Query("""
        SELECT new org.writer.webproduct.dto.SpecDto(s.name, s.value)
        FROM SpecsEntity s
        WHERE s.product.id = :productId
    """)
    List<SpecDto> findSpecsByProductId(@Param("productId") Long productId);
}
