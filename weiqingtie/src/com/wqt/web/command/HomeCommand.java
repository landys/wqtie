package com.wqt.web.command;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.wqt.model.User;
import com.wqt.model.WeddingCard;
import com.wqt.service.WeddingCardService;

/**
 * @author Jinde
 * @since 2013-10-7
 * 
 */
public class HomeCommand implements ICommand {
	private WeddingCardService weddingCardService = new WeddingCardService();

	private static final Logger LOG = Logger.getLogger(HomeCommand.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wqt.web.command.ICommand#execute(javax.servlet.http.
	 * HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		LOG.debug("Enter HomeCommand.execute.");

		User user = (User) request.getSession().getAttribute("loginUser");

		if (user != null) {
			List<WeddingCard> cards = weddingCardService
					.findWeddingCardsByUserId(user.getUserId());
			user.setWeddingCards(cards);
		}
	}
}
