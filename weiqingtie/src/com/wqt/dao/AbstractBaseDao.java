package com.wqt.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;

import com.wqt.util.AppException;
import com.wqt.util.PropertiesManager;

/**
 * It's perfect for the table in database with a single auto-incremented id. For
 * others, you may need to override more methods.
 * 
 * Thread safe.
 * 
 * @author Jinde
 * @since 2013-10-7
 * 
 */
public abstract class AbstractBaseDao<T> implements IBaseDao<T> {
	protected Properties dbProps;

	protected DbSupportFactory dbSupportFactory;

	private static final String SqlPropertiesFileName = "sql.properties";

	private static final Logger LOG = Logger.getLogger(AbstractBaseDao.class);

	protected AbstractBaseDao() throws AppException {
		dbProps = PropertiesManager.getProperties(SqlPropertiesFileName);

		dbSupportFactory = DbSupportFactory.getInstance();
	}

	protected abstract long getId(T t);

	protected abstract void setId(T t, long id);

	protected abstract String getSqlPropPrefix();

	protected abstract T parseRs(ResultSet rs) throws SQLException;

	protected abstract List<Object> convertToParaListWithoutId(T t);

	@Override
	public void saveOrUpdate(T t) throws AppException {
		DbSupport dbSupport = dbSupportFactory.getDbSupport();

		long id = getId(t);
		String sqlPropPrefix = getSqlPropPrefix();
		String sql;
		boolean isUpdate = (id >= 0);
		if (!isUpdate) {
			sql = dbProps.getProperty(sqlPropPrefix + "Create");
		}
		else {
			sql = dbProps.getProperty(sqlPropPrefix + "Update");
		}

		try {
			List<Object> paras = convertToParaListWithoutId(t);

			if (isUpdate) {
				paras.add(id);
			}

			dbSupport.updateSql(sql, paras, !isUpdate);

			// update the id if insert.
			if (!isUpdate) {
				id = dbSupport.getGeneratedId();

				setId(t, id);
			}

		}
		finally {
			dbSupport.close();
		}
	}

	@Override
	public void delete(T t) throws AppException {
		this.delete(getId(t));
	}

	@Override
	public void delete(long id) throws AppException {
		DbSupport dbSupport = dbSupportFactory.getDbSupport();

		String sql = dbProps.getProperty(getSqlPropPrefix() + "Delete");

		try {
			List<Object> paras = new ArrayList<Object>();
			paras.add(id);

			dbSupport.updateSql(sql, paras, false);
		}
		finally {
			dbSupport.close();
		}
	}

	protected T execFindObject(String sql, List<Object> paras)
			throws AppException {
		DbSupport dbSupport = dbSupportFactory.getDbSupport();
		T t = null;
		try {
			ResultSet rs = dbSupport.querySql(sql, paras);
			if (rs.next()) {
				t = parseRs(rs);
			}
		}
		catch (SQLException e) {
			LOG.error(e.getMessage());
			throw new AppException("Error: Read ResultSet.");
		}
		finally {
			dbSupport.close();
		}

		return t;
	}

	@Override
	public T find(long id) throws AppException {
		String sql = dbProps.getProperty(getSqlPropPrefix() + "Find");
		List<Object> paras = new ArrayList<Object>();
		paras.add(id);

		return execFindObject(sql, paras);
	}

	protected List<T> execFindObjects(String sql, List<Object> paras)
			throws AppException {
		DbSupport dbSupport = dbSupportFactory.getDbSupport();

		List<T> ts = new ArrayList<T>();
		try {
			ResultSet rs = dbSupport.querySql(sql, paras);
			while (rs.next()) {
				T t = parseRs(rs);
				ts.add(t);

			}
		}
		catch (SQLException e) {
			LOG.error(e.getMessage());
			throw new AppException("Error: Read ResultSet.");
		}
		finally {
			dbSupport.close();
		}

		return ts;
	}

	@Override
	public List<T> findAll() throws AppException {
		String sql = dbProps.getProperty(getSqlPropPrefix() + "FindAll");
		return execFindObjects(sql, null);
	}
}
