package org.writer.webproduct.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.writer.webproduct.model.BrandEntity;

public interface BrandRepository extends JpaRepository<BrandEntity, Integer> {
}
