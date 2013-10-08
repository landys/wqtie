package com.wqt.model;

import java.util.ArrayList;
import java.util.Date;

/**
 * @author Jinde
 * @since 2013-10-7
 */
public class User extends BaseObject {
	private long userId;

	private String userName;

	private String userPwd;

	private int priviledge;

	private Date createDate;

	private ArrayList<WeddingCard> weddingCards;

	public User() {
		super();
	}
	
	public User(long userId) {
		super();
		this.userId = userId;
	}

	public User(long userId, String userName, String userPwd, int priviledge,
			Date createDate, ArrayList<WeddingCard> weddingCards) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userPwd = userPwd;
		this.priviledge = priviledge;
		this.createDate = createDate;
		this.weddingCards = weddingCards;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPwd() {
		return userPwd;
	}

	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}

	public int getPriviledge() {
		return priviledge;
	}

	public void setPriviledge(int priviledge) {
		this.priviledge = priviledge;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public ArrayList<WeddingCard> getWeddingCards() {
		return weddingCards;
	}

	public void setWeddingCards(ArrayList<WeddingCard> weddingCards) {
		this.weddingCards = weddingCards;
	}

}
