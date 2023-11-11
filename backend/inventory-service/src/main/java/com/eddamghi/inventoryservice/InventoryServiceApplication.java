package com.eddamghi.inventoryservice;

import com.eddamghi.inventoryservice.entities.Product;
import com.eddamghi.inventoryservice.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class InventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(ProductRepository productRepository, RepositoryRestConfiguration restConfiguration) {
        restConfiguration.exposeIdsFor(Product.class);
        return args -> {
            productRepository.save(new Product(null, "Computer", 1000, 10));
            productRepository.save(new Product(null, "Printer", 200, 5));
            productRepository.save(new Product(null, "Smartphone", 500, 15));
            productRepository.findAll().forEach(System.out::println);
        };
    }

}
