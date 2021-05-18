package com.bigbasti.poker.api.controller;

@Controller
public class ViewController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping({ "/home" })
    public String index() {
        logger.debug("forwarding user to client URL binding");
        return "forward:/index.html";
    }
}
