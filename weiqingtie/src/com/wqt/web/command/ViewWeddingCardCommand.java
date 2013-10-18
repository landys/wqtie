package com.wqt.web.command;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wqt.model.WeddingCard;
import com.wqt.service.WeddingCardService;
import com.wqt.util.AppUtils;

/**
 * @author Jinde
 * @since 2013-10-10
 * 
 */
public class ViewWeddingCardCommand implements ICommand {

	private WeddingCardService weddingCardService = new WeddingCardService();

	/**
	 * 
	 */
	public ViewWeddingCardCommand() {
		// TODO Auto-generated constructor stub
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wqt.web.command.ICommand#execute(javax.servlet.http.HttpServletRequest
	 * , javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		WeddingCard card = null;

		String strCardId = request.getParameter("cid");
		if (!AppUtils.checkEmptyString(strCardId)) {
			long cardId = Long.valueOf(strCardId);
			card = weddingCardService.findWeddingCard(cardId);
			if (card == null) {
				CommandHelp.setErrorMessage(request,
						"Error: The card doesn't exist.");
				return;
			}

			request.setAttribute("weddingCard", card);

		}
	}

}
