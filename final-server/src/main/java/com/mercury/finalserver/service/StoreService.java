package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.Store;
import com.mercury.finalserver.dao.StoreDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreService {
    @Autowired
    StoreDao storeDao;

    public List<Store> getAllStores(){
        return storeDao.findAll();
    }
}
