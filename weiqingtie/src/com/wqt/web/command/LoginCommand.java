package com.wqt.web.command;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.wqt.model.User;
import com.wqt.service.UserService;
import com.wqt.util.AppUtils;

/**
 * @author Jinde
 * @since 2013-10-7
 * 
 */
public class LoginCommand implements ICommand {
	private UserService userService = new UserService();

	private static final Logger LOG = Logger.getLogger(LoginCommand.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wqt.web.command.ICommand#execute(javax.servlet.http.
	 * HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		LOG.debug("Enter LoginCommand.execute.");

		String userName = request.getParameter("username");
		String password = request.getParameter("password");

		if (AppUtils.checkEmptyString(userName)
				|| AppUtils.checkEmptyString(password)) {
			return;
		}

		User user = userService.validateUser(userName.trim(), password.trim());
		if (user != null) {
			CommandHelp.setExecuteResult(request, CommandHelp.SuccessResult,
					null, null);
			CommandHelp.setLoginSession(request.getSession(), user);
		}
		else {
			CommandHelp.setExecuteResult(request, CommandHelp.FailResult, null,
					"Invalid name or password.");
			CommandHelp.removeLoginSession(request.getSession());
		}
	}
}
