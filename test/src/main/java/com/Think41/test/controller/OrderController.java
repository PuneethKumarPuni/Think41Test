package com.Think41.test.controller;


import com.Think41.test.dto.OrderResponse;
import com.Think41.test.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    // Get all orders for a specific customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<Map<String, Object>> getOrdersByCustomerId(@PathVariable Integer customerId) {
        
        if (customerId == null || customerId <= 0) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid customer ID");
            errorResponse.put("message", "Customer ID must be a positive integer");
            return ResponseEntity.badRequest().body(errorResponse);
        }
        
        try {
            // Check if customer exists
            if (!orderService.customerExists(customerId)) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Customer not found");
                errorResponse.put("message", "No customer found with ID: " + customerId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }
            
            List<OrderResponse> orders = orderService.getOrdersByCustomerId(customerId);
            Long orderCount = orderService.getOrderCountByCustomerId(customerId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("customerId", customerId);
            response.put("totalOrders", orderCount);
            response.put("orders", orders);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve orders");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    // Get orders for a specific customer with pagination
    @GetMapping("/customer/{customerId}/paginated")
    public ResponseEntity<Map<String, Object>> getOrdersByCustomerIdWithPagination(
            @PathVariable Integer customerId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        if (customerId == null || customerId <= 0) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid customer ID");
            errorResponse.put("message", "Customer ID must be a positive integer");
            return ResponseEntity.badRequest().body(errorResponse);
        }
        
        try {
            // Check if customer exists
            if (!orderService.customerExists(customerId)) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Customer not found");
                errorResponse.put("message", "No customer found with ID: " + customerId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }
            
            Page<OrderResponse> orders = orderService.getOrdersByCustomerIdWithPagination(customerId, page, size);
            
            Map<String, Object> response = new HashMap<>();
            response.put("customerId", customerId);
            response.put("orders", orders.getContent());
            response.put("currentPage", orders.getNumber());
            response.put("totalItems", orders.getTotalElements());
            response.put("totalPages", orders.getTotalPages());
            response.put("hasNext", orders.hasNext());
            response.put("hasPrevious", orders.hasPrevious());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve orders");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    // Get specific order details
    @GetMapping("/{orderId}")
    public ResponseEntity<Map<String, Object>> getOrderById(@PathVariable Integer orderId) {
        
        if (orderId == null || orderId <= 0) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid order ID");
            errorResponse.put("message", "Order ID must be a positive integer");
            return ResponseEntity.badRequest().body(errorResponse);
        }
        
        try {
            Optional<OrderResponse> order = orderService.getOrderById(orderId);
            
            if (order.isPresent()) {
                Map<String, Object> response = new HashMap<>();
                response.put("order", order.get());
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Order not found");
                errorResponse.put("message", "No order found with ID: " + orderId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve order");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    // Get all orders (for testing purposes)
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        try {
            // This would require adding a method to OrderService for all orders
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Use /api/orders/customer/{customerId} to get orders for a specific customer");
            response.put("availableEndpoints", new String[]{
                "GET /api/orders/customer/{customerId}",
                "GET /api/orders/customer/{customerId}/paginated?page=0&size=10",
                "GET /api/orders/{orderId}"
            });
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve orders");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}