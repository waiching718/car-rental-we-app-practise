package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.Insurance;
import com.mercury.finalserver.service.InsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping( value = "/insurances")
public class InsuranceController {
    @Autowired
    InsuranceService insuranceService;

    @GetMapping
    public List<Insurance> getInsurances(){
        return insuranceService.getInsurances();
    }
}
