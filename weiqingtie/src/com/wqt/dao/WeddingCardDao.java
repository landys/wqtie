package com.wqt.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.wqt.model.User;
import com.wqt.model.WeddingCard;
import com.wqt.util.AppException;

public class WeddingCardDao extends AbstractBaseDao<WeddingCard> {

	private static final String SqlPropPrefix = "WeddingCard";

	public WeddingCardDao() throws AppException {
		super();
	}

	public List<WeddingCard> findWeddingCardsByUserId(final long userId)
			throws AppException {
		String sql = dbProps.getProperty("WeddingCardFindAllByUserId");
		List<Object> paras = new ArrayList<Object>();
		paras.add(userId);

		List<WeddingCard> cards = execFindObjects(sql, paras);

		return cards;
	}

	@Override
	protected long getId(WeddingCard t) {
		return t.getCardId();
	}

	@Override
	protected void setId(WeddingCard t, long id) {
		t.setCardId(id);
	}

	@Override
	protected String getSqlPropPrefix() {
		return SqlPropPrefix;
	}

	@Override
	protected WeddingCard parseRs(ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		WeddingCard t = new WeddingCard(rs.getLong("cardId"),
				rs.getString("groom"), rs.getString("bride"),
				rs.getString("title"), rs.getDate("weddingDate"),
				rs.getString("weddingDateDesc"), rs.getString("phone"),
				rs.getString("weixin"), rs.getString("note"),
				rs.getString("story"), rs.getString("videoUrl"),
				rs.getString("musicUrl"), rs.getString("coverPhotoUrl"),
				rs.getString("placeName"), rs.getString("placeAddress"),
				rs.getString("placeUrl"), rs.getString("placePhone"),
				rs.getString("placeLongitude"), rs.getString("placeLatitude"),
				rs.getString("agentName"), rs.getString("agentPhone"),
				rs.getString("agentWeixin"), rs.getString("agentQcodePath"),
				rs.getString("agentWebsite"), rs.getString("agentWeibo"),
				rs.getInt("status"), rs.getDate("createDate"), new User(
						rs.getLong("userId")), null, null);

		return t;
	}

	/*
	 * WeddingCardUpdate=update tbl_wedding_card set userId=?, groom=?, bride=?,
	 * title=?, weddingDate=?, \ weddingDateDesc=?, phone=?, weixin=?, note=?,
	 * story=?, videoUrl=?, musicUrl=?, coverPhotoUrl=?, placeName=?, \
	 * placeAddress=?, placeUrl=?, placePhone=?, agentName=?, agentPhone=?,
	 * agentWeixin=?, agentQcodePath=?, agentWebSite=?, \ agentWeibo=?,
	 * status=?, createDate=? where cardId=?;
	 */
	@Override
	protected List<Object> convertToParaListWithoutId(WeddingCard t) {
		List<Object> paras = new ArrayList<Object>();
		paras.add(t.getUser() != null ? t.getUser().getUserId() : null);
		paras.add(t.getGroom());
		paras.add(t.getBride());
		paras.add(t.getTitle());
		paras.add(t.getWeddingDate());
		paras.add(t.getWeddingDateDesc());
		paras.add(t.getPhone());
		paras.add(t.getWeixin());
		paras.add(t.getNote());
		paras.add(t.getStory());
		paras.add(t.getVideoUrl());
		paras.add(t.getMusicUrl());
		paras.add(t.getCoverPhotoUrl());
		paras.add(t.getPlaceName());
		paras.add(t.getPlaceAddress());
		paras.add(t.getPlaceUrl());
		paras.add(t.getPlacePhone());
		paras.add(t.getPlaceLongitude());
		paras.add(t.getPlaceLatitude());
		paras.add(t.getAgentName());
		paras.add(t.getAgentPhone());
		paras.add(t.getAgentWeixin());
		paras.add(t.getAgentQcodePath());
		paras.add(t.getAgentWebsite());
		paras.add(t.getAgentWeibo());
		paras.add(t.getStatus());
		paras.add(t.getCreateDate());

		return paras;
	}

	// public List<Agent> findAgentsInIds(List<Long> agentIds) throws
	// AppException {
	// String namePlace = "?";
	// int n = agentIds.size();
	// for (int i = 0; i < n - 1; i++) {
	// namePlace += ", ?";
	// }
	//
	// String sql = dbProps.getProperty("AgentFindAllInIds");
	// sql = sql.replaceFirst("\\?", namePlace);
	//
	// List<Object> paras = new ArrayList<Object>();
	// for (long agentId : agentIds) {
	// paras.add(agentId);
	// }
	//
	// return execFindObjects(sql, paras);
	// }
}
