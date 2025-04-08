package com.adminavengers.singlewindow.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adminavengers.singlewindow.entity.Application;
import com.adminavengers.singlewindow.entity.Status;
import com.adminavengers.singlewindow.entity.User;
import com.adminavengers.singlewindow.handleesception.HandleApplicationException;
import com.adminavengers.singlewindow.repository.ApplicationRepository;
import com.adminavengers.singlewindow.repository.UserRepository;
import com.adminavengers.singlewindow.responces.ResponseStructure;
import com.adminavengers.singlewindow.service.ApplicationService;


@RestController
@RequestMapping("/application")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    //to get all application list
    @GetMapping
    public ResponseEntity<ResponseStructure<List<Application>>> getAllPendingApplication (){
    	List<Application> pendingApplications=applicationRepository.findByStatus(Status.PENDING);
    	if (pendingApplications.isEmpty()) {
			throw new HandleApplicationException("no pending application");
		} else {
			ResponseStructure<List<Application>> responseStructure =new ResponseStructure<List<Application>>();
			responseStructure.setData(pendingApplications);
			responseStructure.setMessage("Pending applications are retrived");
			responseStructure.setStatus(HttpStatus.OK.value());
			return new ResponseEntity<ResponseStructure<List<Application>>>(responseStructure,HttpStatus.OK);
		}
    }
    //add application in to database
    @PostMapping
    public ResponseEntity<ResponseStructure<String>> saveApplication(@RequestBody Application application ) {
    	Optional<User> user=userRepository.findById(application.getUser().getId());
    	if (user.isPresent()) {
    		applicationRepository.save(application);
    		ResponseStructure<String> responseStructure=new ResponseStructure<String>();
    		responseStructure.setData("Application waiting for aprovel");
    		responseStructure.setMessage("Application hase been subbmitted");
    		responseStructure.setStatus(HttpStatus.OK.value());
        	return new ResponseEntity<ResponseStructure<String>>(responseStructure,HttpStatus.OK);

		} else {
			throw new HandleApplicationException("Application not valid");

		}
    	
    }
}
