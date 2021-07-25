package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.http.Response;
import com.mercury.finalserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/userByUsername")
    public User getUserByUsername(@RequestParam(value = "username", required = false) Optional<String> username){
        return userService.getUserByUsername(username.get());
    }
    @PostMapping("/users")
    public Response postUser(@RequestBody User user){
        System.out.println(user);
        return userService.register(user);
    }

    @PostMapping("/usersRep")
    public Response postRep(@RequestBody User user){
        return userService.registerRep(user);
    }
    @PostMapping("/usersIns")
    public Response postIns(@RequestBody User user){
        return userService.registerIns(user);
    }

    @DeleteMapping("/users/{id}")
    public Response deleteuser(@PathVariable long id){
        return userService.deleteUser(id);
    }

    @PutMapping("/users")
    public Response updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }
}
