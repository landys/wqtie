package com.wqt.model;

import java.util.Date;

/**
 * @author Jinde
 * @since 2013-10-7
 */
public class Agent extends BaseObject {
	private long agentId;

	private String name;

	private String phone;

	private String weixin;

	private String weibo;

	private String qq;

	private String qcodePath;

	private String address;

	private String webSite;

	private Date createDate;

	public Agent() {
		super();
		this.agentId = -1;
	}

	public Agent(long agentId) {
		super();
		this.agentId = agentId;
	}

	public Agent(long agentId, String name, String phone, String weixin,
			String weibo, String qq, String qcodePath, String address,
			String webSite, Date createDate) {
		super();
		this.agentId = agentId;
		this.name = name;
		this.phone = phone;
		this.weixin = weixin;
		this.weibo = weibo;
		this.qq = qq;
		this.qcodePath = qcodePath;
		this.address = address;
		this.webSite = webSite;
		this.createDate = createDate;
	}

	public long getAgentId() {
		return agentId;
	}

	public void setAgentId(long agentId) {
		this.agentId = agentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getWeibo() {
		return weibo;
	}

	public void setWeibo(String weibo) {
		this.weibo = weibo;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getQcodePath() {
		return qcodePath;
	}

	public void setQcodePath(String qcodePath) {
		this.qcodePath = qcodePath;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getWebSite() {
		return webSite;
	}

	public void setWebSite(String webSite) {
		this.webSite = webSite;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

}
