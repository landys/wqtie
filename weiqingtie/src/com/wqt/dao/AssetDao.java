package com.wqt.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.wqt.model.Asset;
import com.wqt.model.User;
import com.wqt.util.AppException;

public class AssetDao extends AbstractBaseDao<Asset> {

	private static final String SqlPropPrefix = "Asset";

	public AssetDao() throws AppException {
		super();
	}

	@Override
	protected long getId(Asset t) {
		return t.getAssetId();
	}

	@Override
	protected void setId(Asset t, long id) {
		t.setAssetId(id);
	}

	@Override
	protected String getSqlPropPrefix() {
		return SqlPropPrefix;
	}

	public List<Asset> findAssetsByCardId(final long cardId, final long userId)
			throws AppException {
		String sql = dbProps.getProperty("FindAssetsByCardId");
		List<Object> paras = new ArrayList<Object>();
		paras.add(cardId);
		paras.add(userId);

		List<Asset> assets = execFindObjects(sql, paras);

		return assets;
	}

	@Override
	protected Asset parseRs(ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		Asset t = new Asset(rs.getLong("assetId"), rs.getString("title"),
				rs.getString("desc"), rs.getDate("createDate"),
				rs.getString("path"), rs.getInt("type"), new User(
						rs.getLong("userId")));

		return t;
	}

	@Override
	protected List<Object> convertToParaListWithoutId(Asset t) {
		List<Object> paras = new ArrayList<Object>();
		paras.add(t.getUser().getUserId());
		paras.add(t.getTitle());
		paras.add(t.getDesc());
		paras.add(t.getCreateDate());
		paras.add(t.getPath());
		paras.add(t.getType());

		return paras;
	}

}
