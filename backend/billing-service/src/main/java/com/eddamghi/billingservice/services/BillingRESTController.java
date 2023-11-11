package com.eddamghi.billingservice.services;

import com.eddamghi.billingservice.entities.Bill;
import com.eddamghi.billingservice.feign.CustomerRESTClient;
import com.eddamghi.billingservice.feign.ProductRESTClient;
import com.eddamghi.billingservice.model.Customer;
import com.eddamghi.billingservice.model.Product;
import com.eddamghi.billingservice.repositories.BillRepository;
import com.eddamghi.billingservice.repositories.ProductItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class BillingRESTController {
    private BillRepository billRepository;
    private ProductItemRepository productItemRepository;
    private CustomerRESTClient customerRESTClient;
    private ProductRESTClient productRESTClient;
    @GetMapping("/fullBill/{id}")
    public Bill getBillById(@PathVariable(name = "id") Long id) {
        Bill bill = billRepository.findById(id).get();
        Customer customer= customerRESTClient.getCustomerById(id);
        bill.setCustomer(customer);
        bill.getProductItems().forEach(pi->{
            Product product = productRESTClient.findById(pi.getProductId());
            pi.setProduct(product);
        });
        return bill;
    }
}
