package com.wqt.dao;

/**
 * Thread safe.
 * 
 * @author Jinde
 * 
 */
public class DbSupportFactory {
	private static DbSupportFactory factory = new DbSupportFactory();

	// private DbSupport[] dbSupports = new DbSupport[5];

	private DbSupportFactory() {
	}

	public static synchronized DbSupportFactory getInstance() {
		if (factory == null) {
			factory = new DbSupportFactory();
		}
		return factory;
	}

	public synchronized DbSupport getDbSupport() {
		return new DbSupport();
	}
}
