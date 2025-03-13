package com.cab_reservation_system.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cab_reservation_system.project.model.Customer;
import com.cab_reservation_system.project.repository.CustomerRepository;

import java.util.Optional;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    // Add or update customer
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    // Get all active customers (isDelete = 0)
    public List<Customer> getAllCustomers() {
        return customerRepository.findByIsDelete(0);
    }

    // Soft delete customer (set isDelete = 1)
    public boolean deleteCustomer(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            customer.get().setIsDelete(1);
            customerRepository.save(customer.get());
            return true;
        }
        return false;
    }

    // Update customer information
    public Customer updateCustomer(Long id, Customer updatedCustomer) {
        return customerRepository.findById(id).map(customer -> {
            customer.setName(updatedCustomer.getName());
            customer.setAddress(updatedCustomer.getAddress());
            customer.setNic(updatedCustomer.getNic());
            customer.setPhone(updatedCustomer.getPhone());
            return customerRepository.save(customer);
        }).orElseThrow(() -> new RuntimeException("Customer not found!"));
    }
}
