package com.eddamghi.billingservice.entities;

import com.eddamghi.billingservice.model.Customer;
import com.eddamghi.billingservice.model.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bill {
    @Id @GeneratedValue
    private Long id;
    private Date billingDate;
    @OneToMany(mappedBy = "bill")
    private Collection<ProductItem> productItems;
    private Long customerId;
    @Transient
    private Customer customer;

    public Bill(Long id, Date billingDate, Collection<ProductItem> productItems, Long customerId) {
        this.id = id;
        this.billingDate = billingDate;
        this.productItems = productItems;
        this.customerId = customerId;
    }
}
