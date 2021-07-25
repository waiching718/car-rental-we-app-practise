package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.*;
import com.mercury.finalserver.dao.*;
import com.mercury.finalserver.email.EmailService;
import com.mercury.finalserver.http.Response;
import org.apache.catalina.startup.Tomcat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sun.java2d.pipe.SpanShapeRenderer;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class OrderService {

    @Autowired
    OrderDao orderDao;

    @Autowired
    PaneltyDao paneltyDao;

    @Autowired
    InsuranceDao insuranceDao;

    @Autowired
    UserDao userDao;

    @Autowired
    VehicleDao vehicleDao;

    @Autowired
    ExtraServiceDao extraServiceDao;

    @Autowired
    EmailService emailService;

    public List<Order> getAllOrders(){
        return orderDao.findAll();
    }

    @Transactional
    public Response postOrder(Order order){
        System.out.println("Pass in order ====> : "+order);
        try{
            Vehicle vehicle = vehicleDao.findById(order.getVehicle().getId()).get();
            vehicle.setStatus("F");
            orderDao.save(order);
            return new Response(true, 200,"Post reservation(order) succeed");
        }catch(Exception e){
            return new Response(false,400,"Failed to post an order");
        }

    }

    @Transactional
    public Response updateOrder(Order order){
        System.out.println(order);
        System.out.println("Services: ----->" +order.getServices().toString());
        MyDateFormatter myDateFormatter = new MyDateFormatter();
        long id = order.getId();
        try{
            Order existingOrder = orderDao.findById(id).get();
            System.out.println("00000000000000000000000" + existingOrder.getPenalties());
            System.out.println("***********************" + order.getPenalties());
            if(order.getEnd_Date() == null){
                String endDate = myDateFormatter.myFormatter(existingOrder.getEnd_Date());
                existingOrder.setEnd_Date(endDate);
            }else{
                existingOrder.setEnd_Date(order.getEnd_Date());
            }
            if(order.getStart_Date() == null){
                String startDate = myDateFormatter.myFormatter(existingOrder.getStart_Date());
                existingOrder.setStart_Date(startDate);
            }else{
                existingOrder.setStart_Date(order.getStart_Date());
            }
            if(order.getOrder_Date() == null){
                String orderDate = myDateFormatter.myFormatter(existingOrder.getOrder_Date());
                existingOrder.setOrder_Date(orderDate);
            }else{
                existingOrder.setOrder_Date(order.getOrder_Date());
            }

            if(!order.getPenalties().isEmpty()){
                order.getPenalties().forEach(p ->{
                    Penalty penalty = paneltyDao.findById(p.getId()).get();
                    existingOrder.getPenalties().add(penalty);
                });
            }

            if(!order.getInsurances().isEmpty()){
                Set<Insurance> li = order.getInsurances();

                li.forEach(i -> {
                    Insurance insurance = insuranceDao.findById(i.getId()).get();
                    Set<Insurance> newSet = new HashSet<>();
                    newSet.add(insurance);
                    existingOrder.setInsurances(newSet);
                });
            }
            existingOrder.setTotal(order.getTotal());
            existingOrder.setStatus(order.getStatus());
            //existingOrder.setVehicle(order.getVehicle());
            //existingOrder.setUser(order.getUser());
            Set<ExtraService> services = existingOrder.getServices();
            Set<ExtraService> Addservices = order.getServices();
            Addservices.forEach(s ->{
                System.out.println(s);
                services.add(s);
            });
            System.out.println("1111111111111111111111111111111" + existingOrder);
            orderDao.save(existingOrder);
            return new Response(true, 200, "successfully update");
        }catch(Exception e){
            return new Response(false,400,"failed update");
        }
    }

    @Transactional
    public Response closeOrder(Order order){
        System.out.println(order);
        MyDateFormatter myDateFormatter = new MyDateFormatter();
        long id = order.getId();
        try{
            Order existingOrder = orderDao.findById(id).get();
            System.out.println("00000000000000000000000" + existingOrder.getPenalties());
            System.out.println("***********************" + order.getPenalties());
            if(order.getEnd_Date() == null){
                String endDate = myDateFormatter.myFormatter(existingOrder.getEnd_Date());
                existingOrder.setEnd_Date(endDate);
            }else{
                existingOrder.setEnd_Date(order.getEnd_Date());
            }
            if(order.getStart_Date() == null){
                String startDate = myDateFormatter.myFormatter(existingOrder.getStart_Date());
                existingOrder.setStart_Date(startDate);
            }else{
                existingOrder.setStart_Date(order.getStart_Date());
            }
            if(order.getOrder_Date() == null){
                String orderDate = myDateFormatter.myFormatter(existingOrder.getOrder_Date());
                existingOrder.setOrder_Date(orderDate);
            }else{
                existingOrder.setOrder_Date(order.getOrder_Date());
            }

            if(!order.getPenalties().isEmpty()){
                order.getPenalties().forEach(p ->{
                    Penalty penalty = paneltyDao.findById(p.getId()).get();
                    existingOrder.getPenalties().add(penalty);
                });
            }

            existingOrder.setTotal(order.getTotal());
            existingOrder.setStatus(order.getStatus());

            Vehicle vehicle = existingOrder.getVehicle();
            vehicle.setStatus("T");

            System.out.println("1111111111111111111111111111111" + existingOrder);
            orderDao.save(existingOrder);
            emailService.sendSimpleMessage(existingOrder.getUser().getUserDetail().getEmail(), "Order updated!!!", "Hi "+ existingOrder.getUser().getUsername() + " !" + " Your order has just updated. Please check your order if there is any fines applied");
            return new Response(true, 200, "successfully update");
        }catch(Exception e){
            return new Response(false,400,"failed update");
        }
    }


    @Transactional
    public Response postWalkinOrder(Order order){
        System.out.println("in postWalkinOrder -----> "+order);
        User user =  userDao.findByUsername(order.getUser().getUsername());
        Vehicle vehicle = vehicleDao.findById(order.getVehicle().getId()).get();
        try{
            order.setUser(user);
            order.setVehicle(vehicle);
            vehicle.setStatus("F");
            Set<ExtraService> sli = new HashSet<>();
            order.getServices().forEach(s ->{
                ExtraService service = extraServiceDao.findById(s.getId()).get();
                sli.add(service);
            });
            order.setServices(sli);

            Set<Insurance> ili = new HashSet<>();
            order.getInsurances().forEach(i ->{
                Insurance insurance = insuranceDao.findById(i.getId()).get();
                ili.add(insurance);
            });
            order.setInsurances(ili);

            orderDao.save(order);
            return new Response(true,200,"Good");
        }catch(Exception e){
            return new Response(false, 400, "failed");
        }
    }

    @Transactional
    public Response modifyOrder(Order order){
        System.out.println("In modify Order"+order);
        MyDateFormatter myDateFormatter = new MyDateFormatter();
        long id = order.getId();
        try{
            Order existingOrder = orderDao.findById(id).get();
            if(order.getEnd_Date() == null){
                String endDate = myDateFormatter.myFormatter(existingOrder.getEnd_Date());
                existingOrder.setEnd_Date(endDate);
            }else{
                existingOrder.setEnd_Date(order.getEnd_Date());
            }
            if(order.getStart_Date() == null){
                String startDate = myDateFormatter.myFormatter(existingOrder.getStart_Date());
                existingOrder.setStart_Date(startDate);
            }else{
                existingOrder.setStart_Date(order.getStart_Date());
            }
            if(order.getOrder_Date() == null){
                String orderDate = myDateFormatter.myFormatter(existingOrder.getOrder_Date());
                existingOrder.setOrder_Date(orderDate);
            }else{
                existingOrder.setOrder_Date(order.getOrder_Date());
            }

            int newTotal = existingOrder.getTotal() + 30;
            System.out.println( existingOrder.getTotal() + "--------------"+ newTotal);
            existingOrder.setTotal(newTotal);

            System.out.println("1111111111111111111111111111111" + existingOrder);
            orderDao.save(existingOrder);
            emailService.sendSimpleMessage(existingOrder.getUser().getUserDetail().getEmail(), "Order updated!!!", "Hi "+ existingOrder.getUser().getUsername() + " !" + " Your order has just updated. Please check your order if there is any fines applied");
            return new Response(true, 200, "successfully update");
        }catch(Exception e){
            return new Response(false,400,"failed update");
        }
    }

    @Transactional
    public Response cancelOrder(Order order){
        System.out.println("In canceling Order"+order);
        MyDateFormatter myDateFormatter = new MyDateFormatter();
        long id = order.getId();
        try{
            Order existingOrder = orderDao.findById(id).get();
            if(order.getEnd_Date() == null){
                String endDate = myDateFormatter.myFormatter(existingOrder.getEnd_Date());
                existingOrder.setEnd_Date(endDate);
            }else{
                existingOrder.setEnd_Date(order.getEnd_Date());
            }
            if(order.getStart_Date() == null){
                String startDate = myDateFormatter.myFormatter(existingOrder.getStart_Date());
                existingOrder.setStart_Date(startDate);
            }else{
                existingOrder.setStart_Date(order.getStart_Date());
            }
            if(order.getOrder_Date() == null){
                String orderDate = myDateFormatter.myFormatter(existingOrder.getOrder_Date());
                existingOrder.setOrder_Date(orderDate);
            }else{
                existingOrder.setOrder_Date(order.getOrder_Date());
            }

            existingOrder.setStatus("CANCEL");
            existingOrder.getVehicle().setStatus("T");

            System.out.println("1111111111111111111111111111111" + existingOrder);
            orderDao.save(existingOrder);
            emailService.sendSimpleMessage(existingOrder.getUser().getUserDetail().getEmail(), "Order canceled!!!", "Hi "+ existingOrder.getUser().getUsername() + " !" + " Your order has just canceled.");
            return new Response(true, 200, "successfully update");
        }catch(Exception e){
            return new Response(false,400,"failed update");
        }
    }
}
