package com.wqt.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.wqt.model.Photo;
import com.wqt.model.WeddingCard;
import com.wqt.util.AppException;

public class PhotoDao extends AbstractBaseDao<Photo> {

	private static final String SqlPropPrefix = "Photo";

	public PhotoDao() throws AppException {
		super();
	}

	@Override
	protected long getId(Photo t) {
		return t.getPhotoId();
	}

	@Override
	protected void setId(Photo t, long id) {
		t.setPhotoId(id);
	}

	@Override
	protected String getSqlPropPrefix() {
		return SqlPropPrefix;
	}

	public List<Photo> findPhotosByCardId(final long cardId)
			throws AppException {
		String sql = dbProps.getProperty("FindPhotosByCardId");
		List<Object> paras = new ArrayList<Object>();
		paras.add(cardId);

		List<Photo> photos = execFindObjects(sql, paras);

		return photos;
	}

	@Override
	protected Photo parseRs(ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		Photo t = new Photo(rs.getLong("photoId"), rs.getString("title"),
				rs.getString("url"), rs.getDate("createDate"), new WeddingCard(
						rs.getLong("cardId")));

		return t;
	}

	@Override
	protected List<Object> convertToParaListWithoutId(Photo t) {
		List<Object> paras = new ArrayList<Object>();
		paras.add(t.getWeddingCard().getCardId());
		paras.add(t.getTitle());
		paras.add(t.getUrl());
		paras.add(t.getCreateDate());
		return paras;
	}

}
