package org.writer.webproduct.controller;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.writer.webproduct.dto.CreateProductDto;
import org.writer.webproduct.dto.ProductDto;
import org.writer.webproduct.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {


    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<ProductDto> showAllProducts(@RequestParam(value = "offset", defaultValue = "0") @Min(0) Integer offset,
                                            @RequestParam(value = "limit", defaultValue = "20") @Min(1) @Max(100) Integer limit) {
        return productService.showAllProducts(limit, offset);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public ProductDto showProductById(@PathVariable(value = "id") Long id) {
        return productService.showProductById(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/title")
    public List<ProductDto> showByTitleProducts(@RequestParam String title,
                                                @RequestParam(value = "offset", defaultValue = "0") @Min(0) Integer offset,
                                                @RequestParam(value = "limit", defaultValue = "20") @Min(1) @Max(100) Integer limit) {
        return productService.showProductByTitle(title, limit, offset);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/popular")
    public List<ProductDto> showFavorites() {
        return productService.showPopular();
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public String createProduct(@RequestBody CreateProductDto dto) {
        productService.createProduct(dto);
        return "Product created";
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product deleted";
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public String updateProduct(@PathVariable(value = "id") Long id, @RequestBody CreateProductDto dto) {
        System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
        productService.updateProduct(dto, id);
        return "Product updated";
    }
}
