package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.Order;
import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.bean.UserDetail;
import com.mercury.finalserver.bean.UserProfile;
import com.mercury.finalserver.dao.OrderDao;
import com.mercury.finalserver.dao.UserDao;
import com.mercury.finalserver.email.EmailService;
import com.mercury.finalserver.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserDao userDao;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    EmailService emailService;

    public List<User> getAllUsers(){
        return userDao.findAll();
    }

    public User getUserByUsername(String username){
        return userDao.findByUsername(username);
    }

    @Transactional
    public Response register(User user){
        User existing= userDao.findByUsername(user.getUsername());
        if(existing != null){
            return new Response(false,400,"User already exist!");
        }else{
            User newUser = new User();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            //user.setPassword(passwordEncoder.encode(user.getPassword()));
            List<UserProfile> up = new ArrayList<UserProfile>();
            up.add(new UserProfile(2));
            System.out.println(up);
            newUser.setProfiles(up);
            userDao.save(newUser);

            // set user detail (default to null)
            User registeredUser = userDao.findByUsername(user.getUsername());
            UserDetail ud = new UserDetail(registeredUser.getId());
            if(user.getUserDetail() != null){
                ud.setPhone(user.getUserDetail().getPhone());
                ud.setName(user.getUserDetail().getName());
                ud.setAddress(user.getUserDetail().getAddress());
                ud.setEmail(user.getUserDetail().getEmail());
                ud.setCity(user.getUserDetail().getCity());
                ud.setState(user.getUserDetail().getState());
                ud.setZip(user.getUserDetail().getZip());
            }
            ud.setUser(registeredUser);
            registeredUser.setUserDetail(ud);
            emailService.sendSimpleMessage(user.getUserDetail().getEmail(), "Account Created", "Congratulation "+user.getUserDetail().getName()+ "! Your account: " + user.getUsername() + " is created!");
            return new Response(true, 200, "Register successfully !!");
        }
    }

    @Transactional
    public Response registerRep(User user){
        User existing= userDao.findByUsername(user.getUsername());
        if(existing != null){
            return new Response(false,400,"User already exist!");
        }else{
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            List<UserProfile> up = new ArrayList<UserProfile>();
            up.add(new UserProfile(3));
            System.out.println(up);
            user.setProfiles(up);
            userDao.save(user);
            // set user detail (default to null)
            User registeredUser = userDao.findByUsername(user.getUsername());
            UserDetail ud = new UserDetail(registeredUser.getId());
            ud.setUser(registeredUser);
            registeredUser.setUserDetail(ud);
            return new Response(true, 200, "Register successfully !!");
        }
    }

    @Transactional
    public Response registerIns(User user){
        User existing= userDao.findByUsername(user.getUsername());
        if(existing != null){
            return new Response(false,400,"User already exist!");
        }else{
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            List<UserProfile> up = new ArrayList<UserProfile>();
            up.add(new UserProfile(4));
            System.out.println(up);
            user.setProfiles(up);
            userDao.save(user);
            // set user detail (default to null)
            User registeredUser = userDao.findByUsername(user.getUsername());
            UserDetail ud = new UserDetail(registeredUser.getId());
            ud.setUser(registeredUser);
            registeredUser.setUserDetail(ud);
            return new Response(true, 200, "Register successfully !!");
        }
    }

    @Transactional
    public Response deleteUser(long id){
        long lId = id;
        try{
            User user = userDao.findById(lId).get();
            userDao.delete(user);
            return new Response(true, 200, "Successfully delete user");
        }catch(Exception e){
            return new Response(false, 400, "failed delete user");
        }
    }

    @Transactional
    public Response updateUser(User user){
        return new Response(true, 200,"succeed");
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userDao.findByUsername(username);
    }
}
