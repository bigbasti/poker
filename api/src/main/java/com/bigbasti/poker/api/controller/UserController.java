package com.bigbasti.poker.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(path = "/api/user")
public class UserController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    final Environment env;

    @Autowired
    public UserController(Environment environment) {
        this.env = environment;
    }

    /**
     * returns the currently logged in user - spring injects the user instance automatically
     * @param user
     * @return
     */
    @GetMapping("/me")
    public @ResponseBody
    ResponseEntity user(Principal user) {
        if(user == null){
            //no user is logged in
            return ResponseEntity.status(401).build();
        }
        Map<String, Object> principalWithRoles = new HashMap<>();
        principalWithRoles.put("principal", user);
        return ResponseEntity.ok(principalWithRoles);
    }
}
