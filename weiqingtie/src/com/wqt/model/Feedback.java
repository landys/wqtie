package com.wqt.model;

import java.util.Date;

/**
 * @author Jinde
 * @since 2013-10-7
 */
public class Feedback extends BaseObject {
	private long feedbackId;

	private String guestName;

	private int attendees;

	private String phone;

	private String wish;

	private Date createDate;

	private WeddingCard weddingCard;

	public Feedback() {
		// TODO Auto-generated constructor stub
	}

	public Feedback(long feedbackId, String guestName, int attendees,
			String phone, String wish, Date createDate, WeddingCard weddingCard) {
		super();
		this.feedbackId = feedbackId;
		this.guestName = guestName;
		this.attendees = attendees;
		this.phone = phone;
		this.wish = wish;
		this.createDate = createDate;
		this.weddingCard = weddingCard;
	}

	public long getFeedbackId() {
		return feedbackId;
	}

	public void setFeedbackId(long feedbackId) {
		this.feedbackId = feedbackId;
	}

	public String getGuestName() {
		return guestName;
	}

	public void setGuestName(String guestName) {
		this.guestName = guestName;
	}

	public int getAttendees() {
		return attendees;
	}

	public void setAttendees(int attendees) {
		this.attendees = attendees;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getWish() {
		return wish;
	}

	public void setWish(String wish) {
		this.wish = wish;
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
