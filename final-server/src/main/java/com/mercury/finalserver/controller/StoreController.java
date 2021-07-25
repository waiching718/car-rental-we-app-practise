package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.Store;
import com.mercury.finalserver.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/stores")
public class StoreController {
    @Autowired
    StoreService storeService;

    @GetMapping
    public List<Store> getStores(){
        return storeService.getAllStores();
    }
}
