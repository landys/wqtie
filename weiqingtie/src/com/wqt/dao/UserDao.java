package com.wqt.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.wqt.model.User;
import com.wqt.util.AppException;
import com.wqt.util.AppUtils;

public class UserDao extends AbstractBaseDao<User> {

	private static final String SqlPropPrefix = "User";

	public UserDao() throws AppException {
		super();
	}

	public User findByUserName(String userName) throws AppException {
		if (AppUtils.checkEmptyString(userName)) {
			return null;
		}

		String sql = dbProps.getProperty("UserFindByUserName");
		List<Object> paras = new ArrayList<Object>();
		paras.add(userName);

		User user = execFindObject(sql, paras);
		
		return user;
	}

	@Override
	protected long getId(User t) {
		return t.getUserId();
	}

	@Override
	protected String getSqlPropPrefix() {
		return SqlPropPrefix;
	}

	@Override
	protected User parseRs(ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		User t = new User(rs.getLong("userId"), rs.getString("userName"),
				rs.getString("userPwd"), rs.getInt("priviledge"),
				rs.getDate("createDate"), null);

		return t;
	}

	@Override
	protected List<Object> convertToParaListWithoutId(User t) {
		List<Object> paras = new ArrayList<Object>();
		paras.add(t.getUserName());
		paras.add(t.getUserPwd());
		paras.add(t.getPriviledge());
		paras.add(t.getCreateDate());

		return paras;
	}

}
