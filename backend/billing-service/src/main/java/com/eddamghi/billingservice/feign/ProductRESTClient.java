package com.eddamghi.billingservice.feign;

import com.eddamghi.billingservice.model.Product;
import jakarta.ws.rs.QueryParam;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "PRODUCT-SERVICE")
public interface ProductRESTClient {
    @GetMapping("/products")
    PagedModel<Product> findAll(@RequestParam(name = "page") int page, @RequestParam(name = "size") int size);
    @GetMapping("/products/{id}")
    Product findById(@PathVariable Long id);
    @GetMapping("/products?projection=fullProduct")
    PagedModel<Product> findAll();
}
