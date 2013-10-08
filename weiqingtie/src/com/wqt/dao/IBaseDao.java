package com.wqt.dao;

import java.util.List;

import com.wqt.util.AppException;

/**
 * 
 * Base interface for all DAO (Data Access Object) interface. This interface
 * contains the CRUD (create, retrieve, update, and delete) operations for the
 * type of objects whose type is specified with T.
 * 
 * @author Jinde
 * @since 2013-10-7
 * 
 * @param <T>
 *            type parameter.
 * 
 */
public interface IBaseDao<T> {
	/**
	 * save or update the object t according to the state of the object in the
	 * database.
	 * 
	 * @param t
	 *            the Object to be saved or updated
	 */
	void saveOrUpdate(T t) throws AppException;

	/**
	 * delete the object from the database
	 * 
	 * @param t
	 *            the object to be moved away
	 */
	void delete(T t) throws AppException;

	/**
	 * delete the object from the database
	 * 
	 * @param id
	 *            the database ID of the object.
	 */
	void delete(long id) throws AppException;

	/**
	 * Find the certain Object in Database according to the ID.
	 * 
	 * @param id
	 *            the database ID of the object.
	 * @return the object if found.
	 */
	T find(long id) throws AppException;

	/**
	 * Find all the Objects persisted in the Database.
	 * 
	 * @return a list of the object persisted in the database.
	 */
	List<T> findAll() throws AppException;

}
