package com.adminavengers.singlewindow;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
		"com.adminavengers.singlewindow.controller",
		"com.adminavengers.singlewindow.repository",
		"com.adminavengers.singlewindow.responces",
		"com.adminavengers.singlewindow.handleesception"
		})
@EntityScan(basePackages = "com.adminavengers.singlewindow.entity")
public class SinglewindowApplication {

	public static void main(String[] args) {
		SpringApplication.run(SinglewindowApplication.class, args);
	}

}
