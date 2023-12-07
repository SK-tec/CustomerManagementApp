package com.ecorvi.springboot_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecorvi.springboot_backend.model.Customer;
import com.ecorvi.springboot_backend.repository.CustomerRepository;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private  CustomerRepository customerRepository;

    
    public void CustomerRepository(CustomerRepository repository) {
        this.customerRepository = repository;
    }

    public List<Customer> getAllEntities() {
        return customerRepository.findAll();
    }

    public Customer getEntityById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    public Customer saveEntity(Customer customer) {
        return customerRepository.save(customer);
    }

    public void deleteEntity(Long id) {
        customerRepository.deleteById(id);
    }

    public Customer updateCustomer(Long id, Customer customer) {
        Customer existingCustomer = customerRepository.findById(id).orElse(null);;
        existingCustomer.setFirstName(customer.getFirstName());
        existingCustomer.setLastName(customer.getLastName());
        existingCustomer.setEmail(customer.getEmail());
       return customerRepository.save(existingCustomer);
    }
}
