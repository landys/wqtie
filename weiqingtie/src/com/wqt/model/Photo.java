package com.wqt.model;

import java.util.Date;

/**
 * @author Jinde
 * @since 2013-10-7
 */
public class Photo extends BaseObject {
	private long photoId;

	private String title;

	private String url;

	private Date createDate;

	private WeddingCard weddingCard;

	public Photo() {
		this.photoId = -1;
	}

	public Photo(long photoId) {
		this.photoId = photoId;
	}

	public Photo(long photoId, String title, String url, Date createDate,
			WeddingCard weddingCard) {
		super();
		this.photoId = photoId;
		this.title = title;
		this.url = url;
		this.createDate = createDate;
		this.weddingCard = weddingCard;
	}

	public long getPhotoId() {
		return photoId;
	}

	public void setPhotoId(long photoId) {
		this.photoId = photoId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public WeddingCard getWeddingCard() {
		return weddingCard;
	}

	public void setWeddingCard(WeddingCard weddingCard) {
		this.weddingCard = weddingCard;
	}

}
