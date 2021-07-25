package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.Penalty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaneltyDao extends JpaRepository<Penalty, Long> {
}
