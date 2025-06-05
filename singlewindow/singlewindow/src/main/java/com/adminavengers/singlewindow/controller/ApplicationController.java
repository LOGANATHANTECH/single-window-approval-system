package com.adminavengers.singlewindow.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adminavengers.singlewindow.dto.UpdateStatus;
import com.adminavengers.singlewindow.entity.Application;
import com.adminavengers.singlewindow.entity.Status;
import com.adminavengers.singlewindow.entity.User;
import com.adminavengers.singlewindow.handleesception.HandleApplicationException;
import com.adminavengers.singlewindow.repository.ApplicationRepository;
import com.adminavengers.singlewindow.repository.UserRepository;
import com.adminavengers.singlewindow.responces.ResponseStructure;



@RestController
@RequestMapping("/application")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;
    
    @Autowired
    private UserRepository userRepository;

//CREATE APPLICATION
    
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
    
    //to retrive all application 
    @GetMapping("/all")
    public ResponseEntity<ResponseStructure<List<Application>>> getAllApplication(){
    	List<Application> pendingApplications=applicationRepository.findAll();
    	if (pendingApplications.isEmpty()) {
			throw new HandleApplicationException("no application found");
		} else {
			ResponseStructure<List<Application>> responseStructure =new ResponseStructure<List<Application>>();
			responseStructure.setData(pendingApplications);
			responseStructure.setMessage("All applications are retrived");
			responseStructure.setStatus(HttpStatus.OK.value());
			return new ResponseEntity<ResponseStructure<List<Application>>>(responseStructure,HttpStatus.OK);
		}
    }
    
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
    //retrive all aproved applications
    @GetMapping("/getApproved")
    public ResponseEntity<ResponseStructure<List<Application>>> getAprovedApplication(){
    	List<Application> aprovedApplication=applicationRepository.findByStatus(Status.APPROVED);
    	if (aprovedApplication.isEmpty()) {
    		throw new HandleApplicationException("no application's are aproved !");
		} else {
			ResponseStructure<List<Application>> responseStructure=new ResponseStructure<List<Application>>();
			responseStructure.setData(aprovedApplication);
			responseStructure.setMessage("retrived all aproved Applications");
			responseStructure.setStatus(HttpStatus.OK.value());
			return new ResponseEntity<ResponseStructure<List<Application>>>(responseStructure,HttpStatus.OK);
		}
    }

//READ APPLICATION
    
    //retrived all rejected Applications
    @GetMapping("notaccepted")
    public ResponseEntity<ResponseStructure<List<Application>>> getRejectedApplication(){
    	List<Application> rejectedApplication =applicationRepository.findByStatus(Status.REJECTED);
    	if (rejectedApplication.isEmpty()) {
			throw new HandleApplicationException("no Application are rejected");
		} else {
			ResponseStructure<List<Application>> responseStructure=new ResponseStructure<List<Application>>();
			responseStructure.setData(rejectedApplication);
			responseStructure.setMessage("all rejected Applications are retrived");
			responseStructure.setStatus(HttpStatus.OK.value());
			return new ResponseEntity<ResponseStructure<List<Application>>>(responseStructure,HttpStatus.OK);
		}
    }
//UPDATE APPLICATION
    //update status by id
    @PutMapping
    public int updateStatusById(@RequestBody UpdateStatus updateStatus){
    	if(updateStatus.getStatus().toString().equals("APPROVED")) {
    		return applicationRepository.updateStatusById(updateStatus.getId(), Status.APPROVED);
    	}else {
    		return applicationRepository.updateStatusById(updateStatus.getId(), Status.REJECTED);
    	}
    	
    }
    
    
}
