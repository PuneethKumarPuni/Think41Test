package com.Think41.test.repository;




import com.Think41.test.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Long countByUserId(Integer id);
    
    // Get all orders for a specific customer
    List<Order> findByUserIdOrderByCreatedAtDesc(Integer id);
    
    // Get orders for a specific customer with pagination
    Page<Order> findByUserIdOrderByCreatedAtDesc(Integer id, Pageable pageable);
    
    // Check if customer exists in orders
    boolean existsByUserId(Integer id);
}