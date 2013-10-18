package com.wqt.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;

//import com.baidu.bae.api.util.BaeEnv;
import com.sina.sae.util.SaeUserInfo;
import com.wqt.util.AppException;

/**
 * Thread unsafe.
 * 
 * @author Jinde
 * 
 */
public class DbSupport {
	/**
	 * every new instance has a connection to database
	 */
	private Connection conn;

	private PreparedStatement preState;

	private ResultSet rs;

	/**
	 * whether the last operation is updating the database
	 */
	private boolean isLastUpdata;

	private static final Logger LOG = Logger.getLogger(DbSupport.class);

//	private void initConnection() throws AppException {
//		String host = BaeEnv.getBaeHeader(BaeEnv.BAE_ENV_ADDR_SQL_IP);
//		String port = BaeEnv.getBaeHeader(BaeEnv.BAE_ENV_ADDR_SQL_PORT);
//		String username = BaeEnv.getBaeHeader(BaeEnv.BAE_ENV_AK);
//		String password = BaeEnv.getBaeHeader(BaeEnv.BAE_ENV_SK);
//		String driveName = "com.mysql.jdbc.Driver";
//		String dbUrl = "jdbc:mysql://";
//		String serverName = host + ":" + port + "/";
//
//		String databaseName = "fugqnNBSnqciAnwzYZCE";
//		String connName = dbUrl + serverName + databaseName;
//		try {
//			Class.forName(driveName);
//			conn = DriverManager.getConnection(connName, username, password);
//			conn.setAutoCommit(true);
//		} catch (ClassNotFoundException e) {
//			LOG.error(e.getMessage());
//			throw new AppException("Error: DB Driver not found.");
//		} catch (SQLException e) {
//			LOG.error(e.getMessage());
//			throw new AppException("Error: Fail to get DB connection.");
//		}
//	}
	
	private void initConnection() throws AppException {
		String host = "w.rdc.sae.sina.com.cn";
		String port = "3307";
		String username = SaeUserInfo.getAccessKey();
		String password = SaeUserInfo.getSecretKey();
		String driveName = "com.mysql.jdbc.Driver";
		String dbUrl = "jdbc:mysql://";
		String serverName = host + ":" + port + "/";

		String databaseName = "app_weiqingtie";
		String connName = dbUrl + serverName + databaseName;
		try {
			Class.forName(driveName);
			conn = DriverManager.getConnection(connName, username, password);
			conn.setAutoCommit(true);
		} catch (ClassNotFoundException e) {
			LOG.error(e.getMessage());
			throw new AppException("Error: DB Driver not found.");
		} catch (SQLException e) {
			LOG.error(e.getMessage());
			throw new AppException("Error: Fail to get DB connection.");
		}
	}
	

	public void initConnection(int debug) throws AppException {
		// native connect to database
		String driveName = "org.gjt.mm.mysql.Driver";
		String url = "jdbc:mysql://localhost:3306/weiqingtie";
		String username = "root";
		String password = "654321";
		try {
			Class.forName(driveName);
			conn = DriverManager.getConnection(url, username, password);
			conn.setAutoCommit(true);
		} catch (ClassNotFoundException e) {
			LOG.error(e.getMessage());
			throw new AppException("Error: DB Driver not found.");
		} catch (SQLException e) {
			LOG.error(e.getMessage());
			throw new AppException("Error: Fail to get DB connection.");
		}
	}

	public ResultSet querySql(final String sql, final List<Object> paras)
			throws AppException {
		isLastUpdata = false;
		prepareStatement(sql, paras, false);
		try {
			rs = preState.executeQuery();
		} catch (SQLException e) {
			LOG.error(e.getMessage());
			throw new AppException("Error: Fail to read data from DB.");
		}
		return rs;
	}

	public void updateSql(final String sql, final List<Object> paras,
			final boolean returnKey) throws AppException {
		isLastUpdata = true;
		prepareStatement(sql, paras, returnKey);
		try {
			preState.executeUpdate();
		} catch (SQLException e) {
			LOG.error(e.getMessage());
			throw new AppException("Error: Fail to write data to DB.");
		} catch (Exception e) {
			LOG.error(e.getMessage());
			throw new AppException("Error: Update error.");
		}
	}

	public long getGeneratedId() throws AppException {
		if (preState != null && isLastUpdata == true) {
			ResultSet lrs = null;
			try {
				lrs = preState.getGeneratedKeys();
				if (lrs.next()) {
					return (int) lrs.getLong(1);
				}
			} catch (SQLException e) {
				LOG.error(e.getMessage());
				throw new AppException("Error: Get auto-increment id.");
			} finally {
				if (lrs != null) {
					try {
						lrs.close();
					} catch (SQLException e) {
						LOG.error(e.getMessage());
						throw new AppException("Error: Close ResultSet wrong.");
					}
				}
			}
		}
		return -1;
	}

	private void prepareStatement(final String sql, final List<Object> paras,
			final boolean returnKey) throws AppException {
		if (conn == null) {
			initConnection();
		}

		try {
			if (returnKey) {
				preState = conn.prepareStatement(sql,
						Statement.RETURN_GENERATED_KEYS);
			} else {
				preState = conn.prepareStatement(sql);
			}
			if (paras != null) {
				for (int i = 0; i < paras.size(); i++) {
					Object para = paras.get(i);
					int index = i + 1;
					if (para instanceof String) {
						preState.setString(index, (String) para);
					} else if (para instanceof Integer) {
						preState.setInt(index, ((Integer) para).intValue());
					} else if (para instanceof Long) {
						preState.setLong(index, ((Long) para).longValue());
					} else if (para instanceof Double) {
						preState.setDouble(index, ((Double) para).doubleValue());
					} else if (para instanceof Float) {
						preState.setFloat(index, ((Float) para).floatValue());
					} else if (para instanceof Date) {
						preState.setTimestamp(index, new Timestamp(
								((Date) para).getTime()));
					} else {
						preState.setObject(index, para);
					}
				}
			}
		} catch (SQLException e) {
			LOG.error(e.getMessage());
			throw new AppException("Error: Prepare parameters wrong.");
		}
	}

	/**
	 * @throws AppException
	 */
	public void closeResultSet() throws AppException {
		if (rs != null) {
			try {
				rs.close();
				rs = null;
			} catch (SQLException e) {
				LOG.error(e.getMessage());
				throw new AppException("Error: Close ResultSet wrong.");
			}
		}
	}

	/**
	 * @throws AppException
	 */
	public void closeStatement() throws AppException {
		if (rs != null) {
			closeResultSet();
		}
		if (preState != null) {
			try {
				preState.close();
				preState = null;
			} catch (SQLException e) {
				LOG.error(e.getMessage());
				throw new AppException("Error: Close prepared statement wrong.");
			}
		}
	}

	/**
	 * @throws AppException
	 */
	public void close() throws AppException {
		if (preState != null) {
			closeStatement();
		}
		if (conn != null) {
			try {
				conn.close();
				conn = null;
			} catch (SQLException e) {
				LOG.error(e.getMessage());
				throw new AppException("Error: Close connection wrong.");
			}
		}
	}
}
