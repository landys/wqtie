package com.wqt.web.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.wqt.model.User;

/**
 * @author Jinde
 * @since 2013-10-7
 * 
 */
public class CommandHelp {

	public static final String SuccessResult = "Success";
	public static final String FailResult = "Fail";
	public static final String InitialResult = "";

	public static void setExecuteResult(HttpServletRequest request,
			final String result, final String message, final String errorMessage) {
		request.setAttribute("executeResult", result);
		request.setAttribute("message", message);
		request.setAttribute("errorMessage", errorMessage);
	}

	public static void setLoginSession(final HttpSession session,
			final User user) {
		session.setAttribute("loginUser", user);
	}

	public static void removeLoginSession(final HttpSession session) {
		session.removeAttribute("loginUser");
	}

}
