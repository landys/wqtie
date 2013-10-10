package com.wqt.model;

import java.util.ArrayList;
import java.util.Date;

/**
 * @author Jinde
 * @since 2013-10-7
 */
public class WeddingCard extends BaseObject {
	private long cardId;

	private Date createDate;

	private String groom;

	private String bride;

	private String title;

	private Date weddingDate;

	private String weddingDateDesc;

	private String phone;

	private String note;
	
	private int status;

	private User user;

	private Place place;

	private Agent agent;

	private Asset template;

	private Asset music;

	private ArrayList<Asset> videos;

	private ArrayList<Asset> photos;

	private ArrayList<Feedback> feedbacks;

	public WeddingCard() {
		super();
	}
	
	public WeddingCard(long cardId) {
		super();
		this.cardId = cardId;
	}

	public WeddingCard(long cardId, Date createDate, String groom,
			String bride, String title, Date weddingDate,
			String weddingDateDesc, String phone, String note, int status, User user,
			Place place, Agent agent, Asset template, Asset music,
			ArrayList<Asset> videos, ArrayList<Asset> photos,
			ArrayList<Feedback> feedbacks) {
		super();
		this.cardId = cardId;
		this.createDate = createDate;
		this.groom = groom;
		this.bride = bride;
		this.title = title;
		this.weddingDate = weddingDate;
		this.weddingDateDesc = weddingDateDesc;
		this.phone = phone;
		this.note = note;
		this.status = status;
		this.user = user;
		this.place = place;
		this.agent = agent;
		this.template = template;
		this.music = music;
		this.videos = videos;
		this.photos = photos;
		this.feedbacks = feedbacks;
	}

	public long getCardId() {
		return cardId;
	}

	public void setCardId(long cardId) {
		this.cardId = cardId;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getGroom() {
		return groom;
	}

	public void setGroom(String groom) {
		this.groom = groom;
	}

	public String getBride() {
		return bride;
	}

	public void setBride(String bride) {
		this.bride = bride;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getWeddingDate() {
		return weddingDate;
	}

	public void setWeddingDate(Date weddingDate) {
		this.weddingDate = weddingDate;
	}

	public String getWeddingDateDesc() {
		return weddingDateDesc;
	}

	public void setWeddingDateDesc(String weddingDateDesc) {
		this.weddingDateDesc = weddingDateDesc;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Place getPlace() {
		return place;
	}

	public void setPlace(Place place) {
		this.place = place;
	}

	public Agent getAgent() {
		return agent;
	}

	public void setAgent(Agent agent) {
		this.agent = agent;
	}

	public Asset getTemplate() {
		return template;
	}

	public void setTemplate(Asset template) {
		this.template = template;
	}

	public Asset getMusic() {
		return music;
	}

	public void setMusic(Asset music) {
		this.music = music;
	}

	public ArrayList<Asset> getVideos() {
		return videos;
	}

	public void setVideos(ArrayList<Asset> videos) {
		this.videos = videos;
	}

	public ArrayList<Asset> getPhotos() {
		return photos;
	}

	public void setPhotos(ArrayList<Asset> photos) {
		this.photos = photos;
	}

	public ArrayList<Feedback> getFeedbacks() {
		return feedbacks;
	}

	public void setFeedbacks(ArrayList<Feedback> feedbacks) {
		this.feedbacks = feedbacks;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

}
