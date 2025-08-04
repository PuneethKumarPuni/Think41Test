package com.Think41.test.controller;



import com.Think41.test.dto.CustomerResponse;
import com.Think41.test.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {
    
    @Autowired
    private CustomerService customerService;
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        try {
            Page<CustomerResponse> customers = customerService.getAllCustomers(page, size);
            
            Map<String, Object> response = new HashMap<>();
            response.put("customers", customers.getContent());
            response.put("currentPage", customers.getNumber());
            response.put("totalItems", customers.getTotalElements());
            response.put("totalPages", customers.getTotalPages());
            response.put("hasNext", customers.hasNext());
            response.put("hasPrevious", customers.hasPrevious());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve customers");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCustomerById(@PathVariable Integer id) {
        
        if (id == null || id <= 0) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid customer ID");
            errorResponse.put("message", "Customer ID must be a positive integer");
            return ResponseEntity.badRequest().body(errorResponse);
        }
        
        try {
            Optional<CustomerResponse> customer = customerService.getCustomerById(id);
            
            if (customer.isPresent()) {
                Map<String, Object> response = new HashMap<>();
                response.put("customer", customer.get());
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Customer not found");
                errorResponse.put("message", "No customer found with ID: " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve customer");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}