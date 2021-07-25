package com.mercury.finalserver.service;

import antlr.StringUtils;
import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.bean.UserDetail;
import com.mercury.finalserver.dao.UserDao;
import com.mercury.finalserver.dao.UserDetailDao;
import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.http.UserDetailResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.NumberUtils;

@Service
public class UserDetailService {

    @Autowired
    UserDao userDao;

    @Autowired
    UserDetailDao userDetailDao;

    public Response addUserDetail(UserDetail userDetail, Authentication authentication) {
        User user = userDao.findByUsername(authentication.getName());
        userDetail.setUser(user);
        return new UserDetailResponse(true, userDetailDao.save(userDetail), "Added user detail");
    }

    public Response updateUserDetail(UserDetail userDetail) {
        long id = userDetail.getId();
        System.out.println("id ------------->>" + id);
        try{
            // find userDetail by id
            UserDetail ud = userDetailDao.findById(id).get();
            userDetail.setUser(ud.getUser());
            ud = userDetail;
            userDetailDao.save(ud);
            return new UserDetailResponse(true, ud, "Updated detail");
        }catch(Exception e){// if not found, create user detail for this id
            // find user by id
            User user = userDao.findById(id).get();
            userDetail.setUser(user);
            userDetailDao.save(userDetail);
            return new UserDetailResponse(true, userDetail, "Added detail");
        }
    }
}
