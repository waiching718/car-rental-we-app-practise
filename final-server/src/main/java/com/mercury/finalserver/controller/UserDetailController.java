package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.UserDetail;
import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "/user-details")
public class UserDetailController {

    @Autowired
    UserDetailService userDetailService;

    @PutMapping
    public Response putUserDetails(@RequestBody UserDetail userDetail) {
        return userDetailService.updateUserDetail(userDetail);
    }
}
