package com.mercury.finalserver.dao;

import com.mercury.finalserver.bean.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewDao extends JpaRepository<Review, Long> {
}
