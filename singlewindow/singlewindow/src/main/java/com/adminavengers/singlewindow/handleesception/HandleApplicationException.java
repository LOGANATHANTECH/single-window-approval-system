package com.adminavengers.singlewindow.handleesception;

public class HandleApplicationException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Override
	public String getMessage()
	{
		return "application not found";
	}
}
