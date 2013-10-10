package com.wqt.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.wqt.model.Agent;
import com.wqt.model.Asset;
import com.wqt.model.Place;
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
	protected String getSqlPropPrefix() {
		return SqlPropPrefix;
	}

	@Override
	protected WeddingCard parseRs(ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		WeddingCard t = new WeddingCard(rs.getLong("cardId"),
				rs.getDate("createDate"), rs.getString("groom"),
				rs.getString("bride"), rs.getString("title"),
				rs.getDate("weddingDate"), rs.getString("weddingDateDesc"),
				rs.getString("phone"), rs.getString("note"),
				rs.getInt("status"), new User(rs.getLong("userId")), new Place(
						rs.getLong("placeId")),
				new Agent(rs.getLong("agentId")), new Asset(
						rs.getLong("templateId")), new Asset(
						rs.getLong("musicId")), null, null, null);

		return t;
	}

	@Override
	protected List<Object> convertToParaListWithoutId(WeddingCard t) {
		List<Object> paras = new ArrayList<Object>();
		paras.add(t.getUser().getUserId());
		paras.add(t.getCreateDate());
		paras.add(t.getGroom());
		paras.add(t.getBride());
		paras.add(t.getTitle());
		paras.add(t.getWeddingDate());
		paras.add(t.getWeddingDateDesc());
		paras.add(t.getPhone());
		paras.add(t.getNote());
		paras.add(t.getStatus());
		paras.add(t.getPlace().getPlaceId());
		paras.add(t.getAgent().getAgentId());
		paras.add(t.getTemplate().getAssetId());
		paras.add(t.getMusic().getAssetId());

		return paras;
	}

}
