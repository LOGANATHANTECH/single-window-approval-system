package com.adminavengers.singlewindow.handleesception;

public class HandleUserException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public String getMessage() {
		return "rong user";
	}
}
