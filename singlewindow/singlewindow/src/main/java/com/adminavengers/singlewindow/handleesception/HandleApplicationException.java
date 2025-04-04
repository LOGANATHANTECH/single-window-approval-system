package com.adminavengers.singlewindow.handleesception;

public class HandleApplicationException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String message;
	public HandleApplicationException(String message) {
		this.message=message;
	}
	@Override
	public String getMessage()
	{
		return this.message;
	}
}
