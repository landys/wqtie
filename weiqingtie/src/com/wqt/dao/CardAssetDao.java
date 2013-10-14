package com.wqt.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.wqt.model.CardAsset;
import com.wqt.util.AppException;

/**
 * @author Jinde
 * @since 2013-10-14
 * 
 */
public class CardAssetDao extends AbstractBaseDao<CardAsset> {

	public CardAssetDao() throws AppException {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public void saveOrUpdate(CardAsset t) throws AppException {
		DbSupport dbSupport = dbSupportFactory.getDbSupport();

		String sqlPropPrefix = getSqlPropPrefix();
		String sql = dbProps.getProperty(sqlPropPrefix + "Create");

		try {
			List<Object> paras = convertToParaListWithoutId(t);

			dbSupport.updateSql(sql, paras, false);
		}
		finally {
			dbSupport.close();
		}
	}

	@Override
	public void delete(CardAsset t) throws AppException {
		this.delete(t.getCardId(), t.getAssetId());
	}

	@Override
	public void delete(long id) throws AppException {
		throw new AppException("Error: the function should not be called.");
	}

	public void delete(final long cardId, final long assetId)
			throws AppException {
		DbSupport dbSupport = dbSupportFactory.getDbSupport();

		String sql = dbProps.getProperty(getSqlPropPrefix() + "Detete");

		try {
			List<Object> paras = new ArrayList<Object>();
			paras.add(cardId);
			paras.add(assetId);

			dbSupport.updateSql(sql, paras, false);
		}
		finally {
			dbSupport.close();
		}
	}

	@Override
	public CardAsset find(long id) throws AppException {
		throw new AppException("Error: the function should not be called.");
	}

	@Override
	protected long getId(CardAsset t) {
		return t.getAssetId();
	}

	@Override
	protected void setId(CardAsset t, long id) {
		t.setAssetId(id);
	}

	@Override
	protected String getSqlPropPrefix() {
		return "CardAsset";
	}

	@Override
	protected CardAsset parseRs(ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		CardAsset t = new CardAsset(rs.getLong("cardId"), rs.getLong("assetId"));

		return t;
	}

	@Override
	protected List<Object> convertToParaListWithoutId(CardAsset t) {
		List<Object> paras = new ArrayList<Object>();
		paras.add(t.getCardId());
		paras.add(t.getAssetId());

		return paras;
	}

}
