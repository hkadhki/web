package org.writer.webproduct.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.writer.webproduct.dto.CreateProductDto;
import org.writer.webproduct.dto.ProductDto;
import org.writer.webproduct.dto.SpecDto;
import org.writer.webproduct.exception.NotFoundProductException;
import org.writer.webproduct.model.ProductEntity;
import org.writer.webproduct.model.SpecsEntity;
import org.writer.webproduct.repository.ProductRepository;
import org.writer.webproduct.repository.SpecRepository;
import org.writer.webproduct.service.ProductService;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final SpecRepository specRepository;

    public ProductServiceImpl(ProductRepository productRepository, SpecRepository specRepository) {
        this.productRepository = productRepository;
        this.specRepository = specRepository;
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
        Date date = Date.valueOf(LocalDate.now());
        ProductEntity product = new ProductEntity(null, dto.getTitle(), dto.getDescription(), dto.getPrice(), dto.getStockQuantity(),dto.getImg(), date, date,dto.getCategory(),dto.getBrand(), false);
        productRepository.save(product);
        for(SpecDto specDto : dto.getSpecs()) {
            specRepository.save(new SpecsEntity(null, specDto.getName(), specDto.getValue(), product));
        }
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        checkExsist(id);
        productRepository.softDelete(id);
    }

    @Transactional
    @Override
    public void updateProduct(CreateProductDto dto, Long id) {
        checkExsist(id);
        Date date = Date.valueOf(LocalDate.now());
        ProductEntity productEntity = productRepository.findById(id).orElse(null);
        ProductEntity product = new ProductEntity(id, dto.getTitle(), dto.getDescription(), dto.getPrice(), dto.getStockQuantity(), dto.getImg(), productEntity.getCreatedAt() == null ? date : productEntity.getCreatedAt(), date, dto.getCategory(), dto.getBrand(), false );
        productRepository.saveAndFlush(product);
        specRepository.deleteSpecsByProductId(id);
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
