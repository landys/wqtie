package com.wqt.util;

/**
 * @author Jinde
 * 
 */
public class AppException extends Exception {
	private static final long serialVersionUID = -6420205233628507770L;

	public AppException() {
		super();
	}

	public AppException(String message) {
		super(message);
	}

	public AppException(String message, Throwable cause) {
		super(message, cause);
	}

	public AppException(Throwable cause) {
		super(cause);
	}
}
