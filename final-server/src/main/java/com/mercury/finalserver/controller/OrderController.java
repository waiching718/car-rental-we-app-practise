package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.Order;
import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping( value = "/orders")
    public List<Order> getOrders(){
        return orderService.getAllOrders();
    }

    @PostMapping( value = "/orders")
    public Response postOrder(@RequestBody Order order){
        return orderService.postOrder(order);
    }

    @PostMapping( value = "/walkinOrder")
    public Response postWalkinOrder (@RequestBody Order order){
        return orderService.postWalkinOrder(order);
    }

    @PutMapping( value = "/orders")
    public Response updateOrder(@RequestBody Order order){
        return orderService.updateOrder(order);
    }

    @PutMapping( value = "/closeOrder")
    public Response closeOrder(@RequestBody Order order){
        return orderService.closeOrder(order);
    }

    @PutMapping (value = "/cancelOrder")
    public Response cancelOrder(@RequestBody Order order){
        return orderService.cancelOrder(order);
    }

    @PutMapping (value = "/modifyOrder")
    public Response modifyOrder(@RequestBody Order order){
        return orderService.modifyOrder(order);
    }
}
