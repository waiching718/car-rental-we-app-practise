package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceDao extends JpaRepository<Insurance, Long> {
}
