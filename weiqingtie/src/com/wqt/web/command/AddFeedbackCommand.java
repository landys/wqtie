package com.wqt.web.command;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.wqt.model.Feedback;
import com.wqt.model.WeddingCard;
import com.wqt.service.FeedbackService;
import com.wqt.util.AppUtils;

/**
 * @author Jinde
 * @since 2013-10-7
 * 
 */
public class AddFeedbackCommand implements ICommand {
	private FeedbackService feedbackService = new FeedbackService();
	
	private static final Logger LOG = Logger
			.getLogger(AddFeedbackCommand.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wqt.web.command.ICommand#execute(javax.servlet.http.
	 * HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		LOG.debug("Enter AddFeedbackCommand.execute.");

		String strCardId = request.getParameter("cid");
		if (!AppUtils.checkEmptyString(strCardId)) {
			long cardId = Long.valueOf(strCardId);
			String guest = request.getParameter("guest");
			String phone = request.getParameter("phone");
			String strAttendees = request.getParameter("attendees");
			int attendees = AppUtils.checkEmptyString(strAttendees) ? 0
					: Integer.valueOf(strAttendees);
			String wish = request.getParameter("wish");

			Feedback feedback = new Feedback(-1, guest, attendees, phone,
					wish, new Date(), new WeddingCard(cardId));

			feedbackService.saveOrUpdateFeedback(feedback);
			
			CommandHelp.setMessage(request, "YES");
		}
	}
}
