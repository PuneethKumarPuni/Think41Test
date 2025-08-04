package com.Think41.test.service;




import com.Think41.test.dto.CustomerResponse;
import com.Think41.test.entity.User;
import com.Think41.test.repository.OrderRepository;
import com.Think41.test.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CustomerService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    public Page<CustomerResponse> getAllCustomers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userRepository.findAll(pageable);
        
        return users.map(user -> {
            Long orderCount = orderRepository.countByUserId(user.getId());
            return new CustomerResponse(user, orderCount);
        });
    }
    
    public Optional<CustomerResponse> getCustomerById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        
        if (user.isPresent()) {
            Long orderCount = orderRepository.countByUserId(id);
            return Optional.of(new CustomerResponse(user.get(), orderCount));
        }
        
        return Optional.empty();
    }
}