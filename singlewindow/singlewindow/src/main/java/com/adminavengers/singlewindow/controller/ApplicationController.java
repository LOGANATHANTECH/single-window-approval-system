package com.adminavengers.singlewindow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.adminavengers.singlewindow.entity.Application;
import com.adminavengers.singlewindow.responces.ResponseStructure;

@RestController
public class ApplicationController {

	
	public ResponseEntity<ResponseStructure<Application>> getAllApplication(){
		
		return null;
		
	}
}
