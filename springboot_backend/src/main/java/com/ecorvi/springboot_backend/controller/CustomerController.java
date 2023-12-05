package com.ecorvi.springboot_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecorvi.springboot_backend.model.Customer;
import com.ecorvi.springboot_backend.service.CustomerService;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
      private  CustomerService customerService;
  
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    //get all customers
    @GetMapping
    public List<Customer> getAllCustomers(){
        return customerService.getAllEntities();
    }
    @GetMapping("/{id}")
	public Customer getCustomerById(@PathVariable Long id) {
		Customer customer = customerService.getEntityById(id);			
		return customer;
	}
    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer){
        return customerService.saveEntity(customer);
    }
    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id){
        customerService.deleteEntity(id);

    }
          
}
