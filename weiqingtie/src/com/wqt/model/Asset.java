package com.wqt.model;

import java.util.Date;

/**
 * @author Jinde
 * @since 2013-10-7
 */
public class Asset extends BaseObject {
	private long assetId;

	private String title;

	private String desc;

	private Date createDate;

	private String path;

	private int type;

	private User user;

	public Asset() {
		this.assetId = -1;
	}

	public Asset(long assetId) {
		this.assetId = assetId;
	}

	public Asset(long assetId, String title, String desc, Date createDate,
			String path, int type, User user) {
		super();
		this.assetId = assetId;
		this.title = title;
		this.desc = desc;
		this.createDate = createDate;
		this.path = path;
		this.type = type;
		this.user = user;
	}

	public long getAssetId() {
		return assetId;
	}

	public void setAssetId(long assetId) {
		this.assetId = assetId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
