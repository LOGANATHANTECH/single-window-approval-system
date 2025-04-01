package com.adminavengers.singlewindow.controller;

import com.adminavengers.singlewindow.entity.Application;
import com.adminavengers.singlewindow.handleesception.HandleApplicationException;
import com.adminavengers.singlewindow.repository.ApplicationRepository;
import com.adminavengers.singlewindow.responces.ResponseStructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/application")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    // Get all applications
    @GetMapping
    public ResponseEntity<ResponseStructure<List<Application>>> getAllApplications() {
        List<Application> applicationData = applicationRepository.findAll();
        ResponseStructure<List<Application>> response = new ResponseStructure<>();

        if (applicationData.isEmpty()) {
            throw new HandleApplicationException();
        } else {
            response.setStatus(HttpStatus.OK.value());
            response.setMessage("All data retrieved successfully");
            response.setData(applicationData);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    // Get application by ID
    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<Application>> getApplicationById(@PathVariable long id) {
        Optional<Application> applicationData = applicationRepository.findById(id);
        ResponseStructure<Application> response = new ResponseStructure<>();

        if (applicationData.isPresent()) {
            response.setStatus(HttpStatus.OK.value());
            response.setMessage("Application retrieved successfully");
            response.setData(applicationData.get());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            throw new HandleApplicationException();
        }
    }

    // Create new application
    @PostMapping
    public ResponseEntity<ResponseStructure<Application>> createApplication(@RequestBody Application application) {
        Application savedApplication = applicationRepository.save(application);
        ResponseStructure<Application> response = new ResponseStructure<>();
        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("Application created successfully");
        response.setData(savedApplication);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Update application
    @PutMapping("/{id}")
    public ResponseEntity<ResponseStructure<Application>> updateApplication(@RequestBody Application applicationDetails) {
        Optional<Application> existingApplication = applicationRepository.findById(applicationDetails.getId());
        ResponseStructure<Application> response = new ResponseStructure<>();

        if (existingApplication.isPresent()) {
            Application app = existingApplication.get();
            app.setApplicationType(applicationDetails.getApplicationType());
            app.setDescription(applicationDetails.getDescription());
            app.setStatus(applicationDetails.getStatus());
            Application updatedApplication = applicationRepository.save(app);
            
            response.setStatus(HttpStatus.OK.value());
            response.setMessage("Application updated successfully");
            response.setData(updatedApplication);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            throw new HandleApplicationException();
        }
    }

    // Delete application
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseStructure<String>> deleteApplication(@PathVariable long id) {
        Optional<Application> existingApplication = applicationRepository.findById(id);
        ResponseStructure<String> response = new ResponseStructure<>();

        if (existingApplication.isPresent()) {
            applicationRepository.deleteById(id);
            response.setStatus(HttpStatus.OK.value());
            response.setMessage("Application deleted successfully");
            response.setData("Application with ID " + id + " has been deleted.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            throw new HandleApplicationException();
        }
    }
}
