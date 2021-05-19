package com.bigbasti.poker.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableCaching
@SpringBootApplication
@ComponentScan(basePackages = "com.bigbasti.poker")
@EntityScan(basePackages = "com.bigbasti.poker.data.entity")
@EnableJpaRepositories(basePackages = {"com.bigbasti.poker.data.repository"})
public class PokerWebApiApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(PokerWebApiApplication.class, args);
	}

}