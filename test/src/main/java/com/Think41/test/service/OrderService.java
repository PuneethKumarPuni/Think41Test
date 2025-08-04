package com.Think41.test.service;


import com.Think41.test.dto.OrderResponse;
import com.Think41.test.entity.Order;
import com.Think41.test.repository.OrderRepository;
import com.Think41.test.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<OrderResponse> getOrdersByCustomerId(Integer customerId) {
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(customerId);
        return orders.stream()
                .map(OrderResponse::new)
                .collect(Collectors.toList());
    }
    
    public Page<OrderResponse> getOrdersByCustomerIdWithPagination(Integer customerId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(customerId, pageable);
        return orders.map(OrderResponse::new);
    }
    
    public Optional<OrderResponse> getOrderById(Integer orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        return order.map(OrderResponse::new);
    }
    
    public boolean customerExists(Integer customerId) {
        return userRepository.existsById(customerId);
    }
    
    public boolean orderExists(Integer orderId) {
        return orderRepository.existsById(orderId);
    }
    
    public Long getOrderCountByCustomerId(Integer customerId) {
        return orderRepository.countByUserId(customerId);
    }
}