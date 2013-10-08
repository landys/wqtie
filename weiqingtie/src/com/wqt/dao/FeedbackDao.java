package com.wqt.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.wqt.model.Feedback;
import com.wqt.model.WeddingCard;
import com.wqt.util.AppException;

public class FeedbackDao extends AbstractBaseDao<Feedback> {

	private static final String SqlPropPrefix = "Feedback";

	public FeedbackDao() throws AppException {
		super();
	}

	@Override
	protected long getId(Feedback t) {
		return t.getFeedbackId();
	}

	@Override
	protected String getSqlPropPrefix() {
		return SqlPropPrefix;
	}

	@Override
	protected Feedback parseRs(ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		Feedback t = new Feedback(rs.getLong("feedbackId"),
				rs.getString("guestName"), rs.getInt("attendees"),
				rs.getString("phone"), rs.getString("wish"),
				rs.getDate("createDate"), new WeddingCard(rs.getLong("cardId")));

		return t;
	}

	@Override
	protected List<Object> convertToParaListWithoutId(Feedback t) {
		List<Object> paras = new ArrayList<Object>();
		paras.add(t.getWeddingCard().getCardId());
		paras.add(t.getGuestName());
		paras.add(t.getAttendees());
		paras.add(t.getPhone());
		paras.add(t.getWish());
		paras.add(t.getCreateDate());

		return paras;
	}

}
