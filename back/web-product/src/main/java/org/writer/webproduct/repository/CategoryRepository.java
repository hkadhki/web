package org.writer.webproduct.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.writer.webproduct.model.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
}
