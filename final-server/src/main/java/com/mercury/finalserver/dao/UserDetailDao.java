package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailDao extends JpaRepository<UserDetail, Long> {
}
