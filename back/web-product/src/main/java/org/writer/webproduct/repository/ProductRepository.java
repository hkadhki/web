package org.writer.webproduct.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.writer.webproduct.dto.ProductDto;
import org.writer.webproduct.model.ProductEntity;
import org.writer.webproduct.model.PopularEntity;

import java.util.List;


public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    @Query("""
                SELECT new org.writer.webproduct.dto.ProductDto(
                    p.id, 
                    p.title, 
                    p.description, 
                    p.price, 
                    p.stockQuantity, 
                    p.category.name, 
                    p.brand.name,
                    null,
                    p.img 
                ) 
                FROM ProductEntity p
                            where p.deleted = false
            """)
    Page<ProductDto> findAllDto(Pageable pageable);

    @Query("""
                SELECT new org.writer.webproduct.dto.ProductDto(
                    p.id, 
                    p.title, 
                    p.description, 
                    p.price, 
                    p.stockQuantity, 
                    p.category.name, 
                    p.brand.name,
                    null,
                    p.img 
                ) 
                FROM ProductEntity p
                JOIN PopularEntity pp on pp.id = p.id
                            where p.deleted = false
                                        
            """)
    List<ProductDto> findPopularDto();

    @Query("""
                SELECT new org.writer.webproduct.dto.ProductDto(
                    p.id, 
                    p.title, 
                    p.description, 
                    p.price, 
                    p.stockQuantity, 
                    p.category.name, 
                    p.brand.name,
                    null ,
                    p.img 
                ) 
                FROM ProductEntity p
                    where p.id = :id
            """)
    ProductDto findDtoById(Long id);


    @Query("""
                SELECT new org.writer.webproduct.dto.ProductDto(
                    p.id, 
                    p.title, 
                    p.description, 
                    p.price, 
                    p.stockQuantity, 
                    p.category.name, 
                    p.brand.name,
                    null ,
                    p.img 
                ) 
                FROM ProductEntity p
                    where p.title like '%' || :title || '%'
                       and p.deleted = false
            """)
    Page<ProductDto> findDtoByTitle(String title, Pageable pageable);

    @Modifying
    @Query("""
            UPDATE ProductEntity p
                        SET p.stockQuantity = p.stockQuantity - :quantity
                        WHERE p.id = :productId
            """)
    void updateQuantity(Long productId, Integer quantity);

    @Modifying
    @Query("UPDATE ProductEntity p SET p.deleted = true WHERE p.id = :id")
    void softDelete(Long id);



}
