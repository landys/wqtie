package com.wqt.web.command;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Jinde
 * @since 2013-10-7
 * 
 */
public interface ICommand {
	void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException;
}
