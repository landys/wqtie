package com.wqt.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.wqt.model.Place;
import com.wqt.util.AppException;

public class PlaceDao extends AbstractBaseDao<Place> {

	private static final String SqlPropPrefix = "Place";

	public PlaceDao() throws AppException {
		super();
	}

	public List<Place> findPlacesInIds(List<Long> placeIds) throws AppException {
		String namePlace = "?";
		int n = placeIds.size();
		for (int i = 0; i < n - 1; i++) {
			namePlace += ", ?";
		}

		String sql = dbProps.getProperty("PlaceFindAllInIds");
		sql = sql.replaceFirst("\\?", namePlace);

		List<Object> paras = new ArrayList<Object>();
		for (long placeId : placeIds) {
			paras.add(placeId);
		}

		return execFindObjects(sql, paras);
	}

	@Override
	protected long getId(Place t) {
		return t.getPlaceId();
	}

	@Override
	protected void setId(Place t, long id) {
		t.setPlaceId(id);
	}

	@Override
	protected String getSqlPropPrefix() {
		return SqlPropPrefix;
	}

	@Override
	protected Place parseRs(ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		Place t = new Place(rs.getLong("placeId"), rs.getString("name"),
				rs.getString("address"), rs.getString("url"),
				rs.getString("phone"), rs.getLong("longitude"),
				rs.getLong("latitude"));

		return t;
	}

	@Override
	protected List<Object> convertToParaListWithoutId(Place t) {
		List<Object> paras = new ArrayList<Object>();
		paras.add(t.getName());
		paras.add(t.getAddress());
		paras.add(t.getUrl());
		paras.add(t.getPhone());
		paras.add(t.getLongitude());
		paras.add(t.getLatitude());

		return paras;
	}

}
