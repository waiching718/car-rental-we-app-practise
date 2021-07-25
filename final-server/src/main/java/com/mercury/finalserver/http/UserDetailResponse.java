package com.mercury.finalserver.http;

import com.mercury.finalserver.bean.UserDetail;

public class UserDetailResponse extends Response {
    private UserDetail userDetail;
    private String message;

    public UserDetailResponse(boolean success, UserDetail userDetail, String message) {
        super(success);
        this.userDetail = userDetail;
        this.message = message;
    }

    public UserDetail getUserDetail() {
        return userDetail;
    }

    public void setUserDetail(UserDetail userDetail) {
        this.userDetail = userDetail;
    }
}
