package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.Review;
import com.mercury.finalserver.dao.ReviewDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    ReviewDao reviewDao;

    public List<Review> getReviews(){
        return reviewDao.findAll();
    }
}
