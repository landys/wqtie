package com.wqt.model;

/**
 * @author Jinde
 * @since 2013-10-7
 */
public class Place extends BaseObject {
	private long placeId;

	private String name;

	private String address;

	private String url;

	private String phone;

	private long longitude;

	private long latitude;

	public Place() {
		super();
	}

	public Place(long placeId) {
		super();
		this.placeId = placeId;
	}

	public Place(long placeId, String name, String address, String url,
			String phone, long longitude, long latitude) {
		super();
		this.placeId = placeId;
		this.name = name;
		this.address = address;
		this.url = url;
		this.phone = phone;
		this.longitude = longitude;
		this.latitude = latitude;
	}

	public long getPlaceId() {
		return placeId;
	}

	public void setPlaceId(long placeId) {
		this.placeId = placeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public long getLongitude() {
		return longitude;
	}

	public void setLongitude(long longitude) {
		this.longitude = longitude;
	}

	public long getLatitude() {
		return latitude;
	}

	public void setLatitude(long latitude) {
		this.latitude = latitude;
	}

}
