package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.Insurance;
import com.mercury.finalserver.dao.InsuranceDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InsuranceService {
    @Autowired
    InsuranceDao insuranceDao;

    public List<Insurance> getInsurances(){
        return insuranceDao.findAll();
    }
}
