package com.wqt.web.command;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wqt.model.User;
import com.wqt.service.WeddingCardService;
import com.wqt.util.AppUtils;

/**
 * @author Jinde
 * @since 2013-10-10
 *
 */
public class DeleteCardCommand implements ICommand {
	
	private WeddingCardService weddingCardService = new WeddingCardService();

	/**
	 * 
	 */
	public DeleteCardCommand() {
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see com.wqt.web.command.ICommand#execute(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String strCardId = request.getParameter("cid");
		boolean success = false;
		if (!AppUtils.checkEmptyString(strCardId)) {
			long cardId = Long.valueOf(strCardId);
			User user = (User)request.getSession().getAttribute("loginUser");
			if (user != null) {
				weddingCardService.deleteWeddingCard(cardId, user.getUserId());
				success = true;
			}
		}
		
		if (!success) {
			CommandHelp.setErrorMessage(request, "The card probably does not belong to you.");
		}
	}

}
