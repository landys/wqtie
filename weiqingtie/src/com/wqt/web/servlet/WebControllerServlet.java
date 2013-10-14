package com.wqt.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.Properties;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.wqt.util.AppUtils;
import com.wqt.web.command.ICommand;
import com.wqt.web.command.LoginCommand;

/**
 * @author Jinde
 * @since 2013-10-7
 * 
 */
public class WebControllerServlet extends HttpServlet {

	/**
	 * initial properties of the servlet, from web.xml
	 */
	Properties initProps = new Properties();

	private static final long serialVersionUID = 8704493541115711432L;

	private static final Logger LOG = Logger.getLogger(LoginCommand.class);

	/*
	 * (non-Java-doc)
	 * 
	 * @see javax.servlet.http.HttpServlet#HttpServlet()
	 */
	public WebControllerServlet() {
		super();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.servlet.Servlet#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
		super.destroy();
	}

	/*
	 * (non-Java-doc)
	 * 
	 * @see javax.servlet.http.HttpServlet#doGet(HttpServletRequest request,
	 * HttpServletResponse response)
	 */
	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		String uri = request.getRequestURI();
		String action = null;
		// 1-normal action, 2-ajax action.
		int actionType = 1;
		int i = uri.lastIndexOf('/');
		if (uri.endsWith("html")) {
			action = uri.substring(i + 1, uri.length() - 5);
		}
		else if (uri.endsWith("rmt")) {
			action = uri.substring(i + 1, uri.length() - 4);
			actionType = 2;
		}

		if (AppUtils.checkEmptyString(action)) {
			action = "default";
			actionType = 1;
		}

		// Authorization management
		if (request.getSession().getAttribute("loginUser") == null) {
			// Not login
			String strAuth = initProps
					.getProperty(action + "NeedAuthorization");
			if (!"false".equalsIgnoreCase(strAuth)) {
				action = "login";
				response.sendRedirect(action + ".html");
				return;
			}
		}

		LOG.debug("Action is " + action + ".");

		// Execute the command
		String strCommand = initProps.getProperty(action + "Command");
		if (strCommand != null) {
			// Attribute executeResult is used to store the result of execute
			request.removeAttribute("executeResult");
			try {
				@SuppressWarnings("unchecked")
				Class<ICommand> claCommand = (Class<ICommand>) Class
						.forName(strCommand);
				ICommand command = (ICommand) claCommand.newInstance();
				command.execute(request, response);
			}
			catch (ClassNotFoundException e) {
				LOG.error(e.getMessage());
			}
			catch (InstantiationException e) {
				LOG.error(e.getMessage());
			}
			catch (IllegalAccessException e) {
				LOG.error(e.getMessage());
			}

		}

		if (actionType == 1) {		
			// Forword to the right page
			String result = "";
			if (request.getAttribute("executeResult") != null) {
				result = (String) request.getAttribute("executeResult");
			}
			String strPage = initProps.getProperty(action + result + "Page");
			
			if (strPage == null) {
				// use default one
				strPage = initProps.getProperty(action + "Page");
			}
			
			if (strPage != null) {
				if (strPage.endsWith("html")) {
					response.sendRedirect(strPage);
				}
				else {
					RequestDispatcher dispatcher = getServletContext()
							.getRequestDispatcher(strPage);
					dispatcher.forward(request, response);
				}
			}
		}
		else if (actionType == 2) {
			// response with message.
			String message = (String) request.getAttribute("message");
			if (message != null && message.trim().length() > 0) {
				PrintWriter out = null;
				try {
					out = response.getWriter();
					out.print(message);
				}
				catch (IOException e) {
					LOG.error(e.getMessage());
				}
				finally {
					if (out != null) {
						out.close();
					}
				}
			}
		}
	}

	/*
	 * (non-Java-doc)
	 * 
	 * @see javax.servlet.http.HttpServlet#doPost(HttpServletRequest request,
	 * HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.servlet.GenericServlet#init()
	 */
	public void init() throws ServletException {
		super.init();
		for (Enumeration<String> en = getInitParameterNames(); en
				.hasMoreElements();) {
			String name = en.nextElement();
			initProps.put(name, getInitParameter(name));
		}
	}

}
