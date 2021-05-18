package com.bigbasti.poker.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping({ "/home" })
    public String index() {
        logger.debug("forwarding user to client URL binding");
        return "forward:/index.html";
    }
}
