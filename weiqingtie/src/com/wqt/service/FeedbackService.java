package com.wqt.service;

import com.wqt.dao.FeedbackDao;
import com.wqt.model.Feedback;
import com.wqt.util.AppException;

/**
 * @author Jinde
 * @since 2013-10-8
 * 
 */
public class FeedbackService {
	private FeedbackDao feedbackDao;

	public FeedbackService() {
		super();
		try {
			feedbackDao = new FeedbackDao();
		} catch (AppException e) {
			// do nothing
		}
	}

	public void saveOrUpdateFeedback(final Feedback feedback) {
		if (feedback == null) {
			return;
		}

		try {
			feedbackDao.saveOrUpdate(feedback);
		} catch (AppException e) {
			// do nothing
		}
	}
}
