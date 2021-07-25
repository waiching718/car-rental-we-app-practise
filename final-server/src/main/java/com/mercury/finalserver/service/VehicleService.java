package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.Order;
import com.mercury.finalserver.bean.Vehicle;
import com.mercury.finalserver.dao.VehicleDao;
import com.mercury.finalserver.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    VehicleDao vehicleDao;

    public List<Vehicle> getAllVehicles(){
        return vehicleDao.findAll();
    }

    public List<Vehicle> getVehiclesByPageAndSize(int page, int size){
        return vehicleDao.findAll(PageRequest.of(page ,size)).getContent();
    }

    @Transactional
    public Response updateVehicle(Vehicle vehicle){
        System.out.println(vehicle);
        long id = vehicle.getId();
        try{
            Vehicle existingVehicle = vehicleDao.findById(id).get();
            existingVehicle.setColor(vehicle.getColor());
            vehicleDao.save(existingVehicle);
            System.out.println(existingVehicle);
            return new Response(true, 200, "successfully update");
        }catch(Exception e){
            return new Response(false,400,"failed update");
        }
    }
}
