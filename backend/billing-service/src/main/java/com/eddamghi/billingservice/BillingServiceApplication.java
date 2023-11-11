package com.eddamghi.billingservice;

import com.eddamghi.billingservice.entities.Bill;
import com.eddamghi.billingservice.entities.ProductItem;
import com.eddamghi.billingservice.feign.CustomerRESTClient;
import com.eddamghi.billingservice.feign.ProductRESTClient;
import com.eddamghi.billingservice.model.Customer;
import com.eddamghi.billingservice.model.Product;
import com.eddamghi.billingservice.repositories.BillRepository;
import com.eddamghi.billingservice.repositories.ProductItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.PagedModel;

import java.util.Date;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BillingServiceApplication.class, args);
    }
    @Bean
    CommandLineRunner start(BillRepository billRepository, ProductItemRepository productItemRepository
                            , CustomerRESTClient customerRESTClient, ProductRESTClient productRESTClient) {
        return args -> {
            Customer customer= customerRESTClient.getCustomerById(1L);
            Bill bill = billRepository.save(new Bill(null, new Date(), null, customer.getId()));
            PagedModel<Product> productPagedModel = productRESTClient.findAll();
            productPagedModel.forEach(p->{
                ProductItem productItem = new ProductItem();
                productItem.setPrice(p.getPrice());
                productItem.setQuantity(1+new Random().nextInt(100));
                productItem.setBill(bill);
                productItem.setProductId(p.getId());
                productItemRepository.save(productItem);
            });
        };
    }
}

