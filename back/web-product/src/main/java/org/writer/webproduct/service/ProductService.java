package org.writer.webproduct.service;

import org.writer.webproduct.dto.CreateProductDto;
import org.writer.webproduct.dto.ProductDto;

import java.util.List;

public interface ProductService {
    List<ProductDto> showAllProducts(Integer limit, Integer offset);
    ProductDto showProductById(Long id);
    List<ProductDto> showProductByTitle(String title, Integer limit, Integer offset);
    List<ProductDto> showPopular();
    void createProduct(CreateProductDto dto);
    void deleteProduct(Long id);
    void updateProduct(CreateProductDto dto , Long id);
}
