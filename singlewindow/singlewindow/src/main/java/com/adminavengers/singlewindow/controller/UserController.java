package com.adminavengers.singlewindow.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.adminavengers.singlewindow.dto.EntrepreneurData;
import com.adminavengers.singlewindow.dto.OfficerData;
import com.adminavengers.singlewindow.entity.User;
import com.adminavengers.singlewindow.handleesception.HandleUserException;
import com.adminavengers.singlewindow.repository.UserRepository;
import com.adminavengers.singlewindow.responces.ResponseStructure;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserRepository urepo;
	
	//to save the user record
	@PostMapping
	public ResponseEntity<ResponseStructure<User>> saveuser(@RequestBody User user) {
		urepo.save(user);
		ResponseStructure<User> ustructur=new ResponseStructure<User>();
		ustructur.setStatus(HttpStatus.OK.value());
		ustructur.setMessage("user has been retrived");
		ustructur.setData(user);
		return new ResponseEntity<ResponseStructure<User>>(ustructur,HttpStatus.OK);
	}
	
	//verify the officer 
	@PostMapping("/iamofficer")
	public ResponseEntity<ResponseStructure<String>> officerData(@RequestBody OfficerData officerData) {
		Optional<User> user=urepo.findById(officerData.getId());
		ResponseStructure<String> ustructur=new ResponseStructure<String>();
	
			if((user.isPresent()) && (officerData.getEmail().equals(user.get().getEmail()) && officerData.getPassword().equals(user.get().getPassword()))) {
				
				ustructur.setStatus(HttpStatus.OK.value());
				ustructur.setMessage("user has been verified");
				ustructur.setData("succes");
				return new ResponseEntity<ResponseStructure<String>>(ustructur,HttpStatus.OK);
			}else {
				ustructur.setStatus(HttpStatus.NOT_FOUND.value());
				ustructur.setMessage("you entered rong email or password");
				ustructur.setData("Failed");
				return new ResponseEntity<ResponseStructure<String>>(ustructur,HttpStatus.NOT_FOUND);
			}
	}
//	@SuppressWarnings("null")
	//verify the entrepreneur
	@PostMapping("/iamentrepreneur")
	public ResponseEntity<ResponseStructure<User>> verifyEntrepreneur(@RequestBody EntrepreneurData entrepreneurData){
			Optional<User> verifyedUser=urepo.findByEmailAndPassword(entrepreneurData.getEmail(), entrepreneurData.getPassword());
			
			if(verifyedUser.isPresent()) {
				ResponseStructure<User> userData=new ResponseStructure<User>();
				userData.setData(verifyedUser.get());
				userData.setMessage("Succes");
				userData.setStatus(HttpStatus.ACCEPTED.value());
				return new ResponseEntity<ResponseStructure<User>>(userData,HttpStatus.ACCEPTED);
			}else {
				throw new HandleUserException();
			}
			
		
	}
	
	
	//6.	//to get user data by NameAndPassword
	
//	@GetMapping("/{email}/{password}")
//	public ResponseEntity<ResponseStructure<List<User>>> fetchByEmailAndPassword(@PathVariable String email,@PathVariable String password) {
//		System.out.println(email+password);
//		List<User> user=urepo.findByEmailAndPassword(email, password);
//		ResponseStructure<List<User>> userstructur=new ResponseStructure<List<User>>();
//		if(user.size()>0) {
//			
//			userstructur.setStatus(HttpStatus.OK.value());
//			userstructur.setMessage("user has been retrived");
//			userstructur.setData(user);
//			return new ResponseEntity<ResponseStructure<List<User>>>(userstructur,HttpStatus.OK);
//					
//		}else {
//			throw new HandleUserException();
//		}
//	}
	
	
	
//2.	//to retrive all user data 
	@GetMapping
	public ResponseEntity<ResponseStructure<List<User>>> getAllUser() {
		
		List<User> allusers=urepo.findAll();
		
		ResponseStructure<List<User>> ustructur=new ResponseStructure<List<User>>();
		 
		if(allusers.size()>0) {
			ustructur.setStatus(HttpStatus.OK.value());
			ustructur.setMessage("all users has been retrived");
			ustructur.setData(allusers);
			return new ResponseEntity<ResponseStructure<List<User>>>(ustructur,HttpStatus.OK);
		}else {
			throw new HandleUserException();
		}
		
		 
	}
	
	
	
//	//2.	//to retrive all user data 
//		@GetMapping("name/{name}")
//		public ResponseEntity<ResponseStructure<List<User>>> geUserByname(@PathVariable String name){
//			
//			List<User> allusers=urepo.findByName(name);
//			
//			ResponseStructure<List<User>> ustructur=new ResponseStructure<List<User>>();
//			
//			if(allusers.size()>0) {
//				ustructur.setStatus(HttpStatus.OK.value());
//				ustructur.setMessage("all users has been retrived");
//				ustructur.setData(allusers);
//				return new ResponseEntity<ResponseStructure<List<User>>>(ustructur,HttpStatus.OK);
//			}else {
//				throw new HandleUserException();
//			}
//			
//			 
//		}
//		
	

//3.	//to retrive single user data 
	@GetMapping("/{id}")
	public ResponseEntity<ResponseStructure<User>> getUser(@PathVariable Long id) {
		
		Optional<User> user=urepo.findById(id);
		ResponseStructure<User> ustructur=new ResponseStructure<User>();
		if(user.isPresent()) {
			ustructur.setStatus(HttpStatus.OK.value());
			ustructur.setMessage("user has been retrived");
			ustructur.setData(user.get());
			return new ResponseEntity<ResponseStructure<User>>(ustructur,HttpStatus.OK);
		}else {
			throw new HandleUserException();
		}
	}
	
//4.	//to update user data 
	@PutMapping()
	public ResponseEntity<ResponseStructure<User>> updateUser(@RequestBody User user) {
			
		Optional<User> opuser=urepo.findById(user.getId());
		ResponseStructure<User> ustructur=new ResponseStructure<User>();
			if(opuser.isPresent()) {
				urepo.save(user);
				ustructur.setStatus(HttpStatus.OK.value());
				ustructur.setMessage("user has been updated");
				ustructur.setData(user);
				return new ResponseEntity<ResponseStructure<User>>(ustructur,HttpStatus.OK);
			}else {
				throw new HandleUserException();
			}
		}

////5.	//to delete user data 
//		@PutMapping("/{id}")
//		public ResponseEntity<ResponseStructure<User>> deleteUser(@PathVariable Long id) {
//			
//			Optional<User> user=urepo.findById(id);
//			ResponseStructure<User> ustructur=new ResponseStructure<User>();
//			if(user.isPresent()) {
//				urepo.delete(user.get());
//				ustructur.setStatus(HttpStatus.OK.value());
//				ustructur.setMessage("user has been deleted");
//				ustructur.setData(user.get());
//				return new ResponseEntity<ResponseStructure<User>>(ustructur,HttpStatus.OK);
//			}else {
//				throw new HandleUserException();
//			}
//		}
//		

	
}














