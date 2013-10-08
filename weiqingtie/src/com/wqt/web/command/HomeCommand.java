package com.wqt.web.command;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

/**
 * @author Jinde
 * @since 2013-10-7
 * 
 */
public class HomeCommand implements ICommand {
	private static final Logger LOG = Logger.getLogger(HomeCommand.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wqt.web.command.ICommand#execute(javax.servlet.http.
	 * HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		LOG.debug("Enter LoginCommand.execute.");
		
		CommandHelp.removeLoginSession(request.getSession());
	}

}
