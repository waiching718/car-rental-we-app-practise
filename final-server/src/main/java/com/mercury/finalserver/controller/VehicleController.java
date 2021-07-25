package com.mercury.finalserver.controller;
import com.mercury.finalserver.bean.Vehicle;
import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class VehicleController {

    @Autowired
    VehicleService vehicleService;

    @GetMapping(value= "/vehicles")
    public List<Vehicle> getVehicles(
            @RequestParam(value = "page", required = false) Optional<Integer> page,
            @RequestParam(value = "size", required = false) Optional<Integer> size
    ){
        if( page.isPresent() && size.isPresent() ){
            return vehicleService.getVehiclesByPageAndSize(page.get(), size.get());
        } else{
            return vehicleService.getAllVehicles();
        }

    }

    @PutMapping(value="/vehicles")
    public Response updateVehicle(@RequestBody Vehicle vehicle){
        return vehicleService.updateVehicle(vehicle);
    }

}
