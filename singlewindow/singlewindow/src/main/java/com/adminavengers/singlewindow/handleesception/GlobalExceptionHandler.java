package com.adminavengers.singlewindow.handleesception;

import java.io.Serializable;

import com.adminavengers.singlewindow.responces.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@ExceptionHandler(HandleUserException.class)
	public ResponseEntity<ResponseStructure<String>> HandleUserNotFoundException( HandleUserException userexception){
		
		ResponseStructure<String> uStructure=new ResponseStructure<String>();
		uStructure.setStatus(HttpStatus.NOT_FOUND.value());
		uStructure.setMessage(userexception.getMessage());
		uStructure.setData("user not found");
		return new ResponseEntity<ResponseStructure<String>>(uStructure,HttpStatus.NOT_FOUND) ;
		
	}
	
	@ExceptionHandler(HandleApplicationException.class)
	public ResponseEntity<ResponseStructure<String>> handleApplicationException(HandleApplicationException handleApplicationException){
		ResponseStructure<String> responseStructure=new ResponseStructure<String>();
		responseStructure.setStatus(HttpStatus.NOT_FOUND.value());
		responseStructure.setMessage(handleApplicationException.getMessage());
		responseStructure.setData("Failed");
		return new ResponseEntity<ResponseStructure<String>>(responseStructure,HttpStatus.NOT_FOUND);
	}
	
}
