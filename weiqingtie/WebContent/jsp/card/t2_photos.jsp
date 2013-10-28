<%@page import="com.wqt.util.AppUtils"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.wqt.model.Photo"%>
<%@page import="com.wqt.model.WeddingCard"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%
WeddingCard card = (WeddingCard) request.getAttribute("weddingCard");
long cardId = -1;
List<Photo> photos = null;

if (card != null) {
	cardId = card.getCardId();
	photos = card.getPhotos();
}
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><%=(card != null ? card.getTitle() : "")%></title>
<link href="css/core.css" rel="stylesheet" />
<link href="css/t2.css" rel="stylesheet" />
<link rel="shortcut icon" href="images/favicon.ico" />
</head>

<body title="<%=(card != null ? card.getTitle() : "")%>"
	icon="<%=card != null ? AppUtils.AssetSitePrefix + card.getCoverPhotoUrl() : "" %>"
	link="<%=(AppUtils.getWebSiteUrl(request) + "t2.html?cid=" + cardId) %>"
	desc="<%=(card != null ? card.getWeddingDateDesc() : "")%>&nbsp;<%=(card != null ? card.getPlaceAddress() : "")%>">
	<div class="t2">
		<div class="t2_content">
			<div class="t2_top">
				<a href="t2.html?cid=<%=cardId%>"
					style="width: 50px; border-radius: 10px; margin-left: 10px; background: #EF1140; display: block; float: left;">返回</a><%=(card != null ? card.getTitle() : "")%>
			</div>
<%
if (photos != null && photos.size() > 0) {
%>
			<ul>
<%
	for (Photo photo : photos) {
		if (photo != null && !AppUtils.checkEmptyString(photo.getUrl())) {
%>
				<li style="background: lightgray;"><img src="<%=AppUtils.AssetSitePrefix + photo.getUrl() %>" width="100%"></li>
<%
		}
	}
%>
			</ul>
<%
}
%>
		</div>
	</div>
	<!--婚礼模版-->
	<div style="text-align: center; border-top: solid 1px">
			<p>
				本喜帖由“<a class="about_color" href="<%=(card != null ? card.getAgentWebsite() : "")%>"
					target="_blank"><%=(card != null ? card.getAgentName() : "")%></a>”幸福提供<br> 关注微信公众账号“<span
					class="about_color"><%=(card != null ? card.getAgentWeixin() : "")%></span>”获取专属微信喜帖
			</p>
			<!-- <a class="about_color" href="http://weiqingtie.com/" target="_blank"><img
				style="width: 80px;" src="images/weixin.jpg"></a> -->
		</div>
</body>

<script src="http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js"></script>
<script src="js/wx.js"></script>
</html>