package com.eddamghi.billingservice.feign;

import com.eddamghi.billingservice.model.Customer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "CUSTOMER-SERVICE")
public interface CustomerRESTClient {
    @GetMapping("/customers/{id}")
    public Customer getCustomerById(@PathVariable(name = "id") Long id);

}
