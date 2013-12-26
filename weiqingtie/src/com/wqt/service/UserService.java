package com.wqt.service;

import com.wqt.dao.UserDao;
import com.wqt.model.User;
import com.wqt.util.AppException;
import com.wqt.util.AppUtils;

/**
 * @author Jinde
 * @since 2013-10-8
 * 
 */
public class UserService {
	private UserDao userDao;

	public UserService() {
		super();
		try {
			userDao = new UserDao();
		}
		catch (AppException e) {
			// do nothing
		}
	}

	public User validateUser(final String userName, final String password) {
		User user = null;

		if (!AppUtils.checkEmptyString(userName)
				&& !AppUtils.checkEmptyString(password)) {
			try {
				user = userDao.findByUserName(userName);
				if (user != null && !password.equals(user.getUserPwd())) {
					user = null;
				}
			}
			catch (AppException e) {
				// do nothing
			}
		}

		return user;
	}
}
