package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleDao extends JpaRepository<Vehicle,Long> {

}
