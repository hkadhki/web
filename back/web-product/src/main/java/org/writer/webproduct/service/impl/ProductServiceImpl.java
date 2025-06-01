package org.writer.webproduct.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.writer.webproduct.dto.CreateProductDto;
import org.writer.webproduct.dto.ProductDto;
import org.writer.webproduct.dto.SpecDto;
import org.writer.webproduct.exception.NotFoundProductException;
import org.writer.webproduct.model.BrandEntity;
import org.writer.webproduct.model.CategoryEntity;
import org.writer.webproduct.model.ProductEntity;
import org.writer.webproduct.model.SpecsEntity;
import org.writer.webproduct.repository.BrandRepository;
import org.writer.webproduct.repository.CategoryRepository;
import org.writer.webproduct.repository.ProductRepository;
import org.writer.webproduct.repository.SpecRepository;
import org.writer.webproduct.service.ProductService;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final SpecRepository specRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, SpecRepository specRepository, BrandRepository brandRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.specRepository = specRepository;
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<ProductDto> showAllProducts(Integer limit, Integer offset) {
        Page<ProductDto> products = productRepository.findAllDto(PageRequest.of(offset, limit));

        products.getContent().forEach(product -> {
            List<SpecDto> specs = specRepository.findSpecsByProductId(product.getId());
            product.setSpecs(specs);
        });

        return products.getContent();
    }

    @Override
    public ProductDto showProductById(Long id) {
        checkExsist(id);
        ProductDto product = productRepository.findDtoById(id);
        List<SpecDto> specs = specRepository.findSpecsByProductId(id);
        product.setSpecs(specs);

        return product;
    }

    @Override
    public List<ProductDto> showProductByTitle(String title, Integer limit, Integer offset) {
        Page<ProductDto> products = productRepository.findDtoByTitle(title, PageRequest.of(offset, limit));
        products.getContent().forEach(product -> {
            List<SpecDto> specs = specRepository.findSpecsByProductId(product.getId());
            product.setSpecs(specs);
        });

        return products.getContent();
    }

    @Override
    public List<ProductDto> showPopular() {
        return productRepository.findPopularDto();
    }


    @Transactional
    @Override
    public void createProduct(CreateProductDto dto) {
        BrandEntity brandEntity = brandRepository.findById(dto.getBrandId()).orElse(null);
        CategoryEntity categoryEntity = categoryRepository.findById(dto.getCategoryId()).orElse(null);
        Date date = Date.valueOf(LocalDate.now());
        ProductEntity product = new ProductEntity(null, dto.getTitle(), dto.getDescription(), dto.getPrice(), dto.getStockQuantity(),dto.getImg(), date, date,categoryEntity,brandEntity, false);
        productRepository.save(product);
        for(SpecDto specDto : dto.getSpecs()) {
            specRepository.save(new SpecsEntity(null, specDto.getName(), specDto.getValue(), product));
        }
    }

    @Override
    public void deleteProduct(Long id) {
        checkExsist(id);
        productRepository.softDelete(id);
    }

    @Transactional
    @Override
    public void updateProduct(CreateProductDto dto) {
        checkExsist(dto.getId());
        BrandEntity brandEntity = brandRepository.findById(dto.getBrandId()).orElse(null);
        CategoryEntity categoryEntity = categoryRepository.findById(dto.getCategoryId()).orElseThrow();
        Date date = Date.valueOf(LocalDate.now());
        ProductEntity productEntity = productRepository.findById(dto.getId()).orElse(null);
        ProductEntity product = new ProductEntity(dto.getId(), dto.getTitle(), dto.getDescription(), dto.getPrice(), dto.getStockQuantity(), dto.getImg(), productEntity.getCreatedAt() == null ? date : productEntity.getCreatedAt(), date,categoryEntity,brandEntity, false );
        productRepository.saveAndFlush(product);
        for(SpecDto specDto : dto.getSpecs()) {
            specRepository.saveAndFlush(new SpecsEntity( specDto.getName(), specDto.getValue(), product));
        }
    }


    private void checkExsist(Long id) {
        if(!productRepository.existsById(id)) {
            throw new NotFoundProductException("Product with id " + id + " not found");
        }
    }

}
