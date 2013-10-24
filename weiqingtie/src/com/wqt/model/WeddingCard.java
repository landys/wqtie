package com.wqt.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author Jinde
 * @since 2013-10-7
 */
public class WeddingCard extends BaseObject {
	private long cardId;

	private String groom;

	private String bride;

	private String title;

	private Date weddingDate;

	private String weddingDateDesc;

	private String phone;

	private String weixin;

	private String note;

	private String story;

	private String videoUrl;

	private String musicUrl;

	private String coverPhotoUrl;

	private String pagePhotoUrl;

	private String placeName;

	private String placeAddress;

	private String placeUrl;

	private String placePhone;

	private String placeLongitude;

	private String placeLatitude;

	private String agentName;

	private String agentPhone;

	private String agentWeixin;

	private String agentQcodePath;

	private String agentWebsite;

	private String agentWeibo;

	private int status;

	private Date createDate;

	private User user;

	private List<Photo> photos;

	private List<Feedback> feedbacks;

	public WeddingCard() {
		super();

		this.cardId = -1;
	}

	public WeddingCard(long cardId) {
		super();
		this.cardId = cardId;
	}

	public WeddingCard(long cardId, String groom, String bride, String title,
			Date weddingDate, String weddingDateDesc, String phone,
			String weixin, String note, String story, String videoUrl,
			String musicUrl, String coverPhotoUrl, String pagePhotoUrl,
			String placeName, String placeAddress, String placeUrl,
			String placePhone, String placeLongitude, String placeLatitude,
			String agentName, String agentPhone, String agentWeixin,
			String agentQcodePath, String agentWebsite, String agentWeibo,
			int status, Date createDate, User user, ArrayList<Photo> photos,
			ArrayList<Feedback> feedbacks) {
		super();
		this.cardId = cardId;
		this.groom = groom;
		this.bride = bride;
		this.title = title;
		this.weddingDate = weddingDate;
		this.weddingDateDesc = weddingDateDesc;
		this.phone = phone;
		this.weixin = weixin;
		this.note = note;
		this.story = story;
		this.videoUrl = videoUrl;
		this.musicUrl = musicUrl;
		this.coverPhotoUrl = coverPhotoUrl;
		this.pagePhotoUrl = pagePhotoUrl;
		this.placeName = placeName;
		this.placeAddress = placeAddress;
		this.placeUrl = placeUrl;
		this.placePhone = placePhone;
		this.placeLongitude = placeLongitude;
		this.placeLatitude = placeLatitude;
		this.agentName = agentName;
		this.agentPhone = agentPhone;
		this.agentWeixin = agentWeixin;
		this.agentQcodePath = agentQcodePath;
		this.agentWebsite = agentWebsite;
		this.agentWeibo = agentWeibo;
		this.status = status;
		this.createDate = createDate;
		this.user = user;
		this.photos = photos;
		this.feedbacks = feedbacks;
	}

	public long getCardId() {
		return cardId;
	}

	public void setCardId(long cardId) {
		this.cardId = cardId;
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

	public String getWeixin() {
		return weixin;
	}

	public void setWeixin(String weixin) {
		this.weixin = weixin;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getStory() {
		return story;
	}

	public void setStory(String story) {
		this.story = story;
	}

	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	public String getMusicUrl() {
		return musicUrl;
	}

	public void setMusicUrl(String musicUrl) {
		this.musicUrl = musicUrl;
	}

	public String getCoverPhotoUrl() {
		return coverPhotoUrl;
	}

	public void setCoverPhotoUrl(String coverPhotoUrl) {
		this.coverPhotoUrl = coverPhotoUrl;
	}

	public String getPagePhotoUrl() {
		return pagePhotoUrl;
	}

	public void setPagePhotoUrl(String pagePhotoUrl) {
		this.pagePhotoUrl = pagePhotoUrl;
	}

	public String getPlaceName() {
		return placeName;
	}

	public void setPlaceName(String placeName) {
		this.placeName = placeName;
	}

	public String getPlaceAddress() {
		return placeAddress;
	}

	public void setPlaceAddress(String placeAddress) {
		this.placeAddress = placeAddress;
	}

	public String getPlaceUrl() {
		return placeUrl;
	}

	public void setPlaceUrl(String placeUrl) {
		this.placeUrl = placeUrl;
	}

	public String getPlacePhone() {
		return placePhone;
	}

	public void setPlacePhone(String placePhone) {
		this.placePhone = placePhone;
	}

	public String getPlaceLongitude() {
		return placeLongitude;
	}

	public void setPlaceLongitude(String placeLongitude) {
		this.placeLongitude = placeLongitude;
	}

	public String getPlaceLatitude() {
		return placeLatitude;
	}

	public void setPlaceLatitude(String placeLatitude) {
		this.placeLatitude = placeLatitude;
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public String getAgentPhone() {
		return agentPhone;
	}

	public void setAgentPhone(String agentPhone) {
		this.agentPhone = agentPhone;
	}

	public String getAgentWeixin() {
		return agentWeixin;
	}

	public void setAgentWeixin(String agentWeixin) {
		this.agentWeixin = agentWeixin;
	}

	public String getAgentQcodePath() {
		return agentQcodePath;
	}

	public void setAgentQcodePath(String agentQcodePath) {
		this.agentQcodePath = agentQcodePath;
	}

	public String getAgentWebsite() {
		return agentWebsite;
	}

	public void setAgentWebsite(String agentWebsite) {
		this.agentWebsite = agentWebsite;
	}

	public String getAgentWeibo() {
		return agentWeibo;
	}

	public void setAgentWeibo(String agentWeibo) {
		this.agentWeibo = agentWeibo;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Photo> getPhotos() {
		return photos;
	}

	public void setPhotos(List<Photo> photos) {
		this.photos = photos;
	}

	public List<Feedback> getFeedbacks() {
		return feedbacks;
	}

	public void setFeedbacks(List<Feedback> feedbacks) {
		this.feedbacks = feedbacks;
	}

}
