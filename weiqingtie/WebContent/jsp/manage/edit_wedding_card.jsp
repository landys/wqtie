<%@page import="com.wqt.model.Photo"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.wqt.util.AppUtils"%>
<%@page import="com.wqt.model.WeddingCard"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
<title>请贴编辑</title>
<link rel="shortcut icon" href="images/favicon.ico" />
</head>

<body>
<div id="divEditCard">
   <h2>请贴编辑</h2>
<%
String errorMessage = (String)request.getAttribute("errorMessage");
if (errorMessage != null && errorMessage.trim().length() > 0) {
%>
   <span style="color:red"><%=errorMessage%></span>
<%
}
String message = (String)request.getAttribute("message");
if (message != null && message.trim().length() > 0) {
%>
   <span style="color:blue"><b><%=message%></b></span>
<%
}
%>

<%
WeddingCard card = (WeddingCard)request.getAttribute("weddingCard");
long cardId = -1;
List<Photo> photos = null;

if (card != null) {
	cardId = card.getCardId();
	photos = card.getPhotos();
}
%>
   <form method="post" action="edit_card.html?step=submit<%=cardId >= 0 ? ("&cid=" + cardId) : ""%>">
   <table>
    <tr>
   		<td><label for="title">请贴标题：</label></td>
   		<td><input type="text" name="title" id="title" size="50" value="<%=(card != null ? card.getTitle() : "")%>" /></td>
   	</tr>
   	<tr>
   		<td><label for="groom">新郎：</label></td>
   		<td><input type="text" name="groom" id="groom" size="50" value="<%=(card != null ? card.getGroom() : "")%>" /></td>
   	</tr>
    <tr>
   		<td><label for="bride">新娘：</label></td>
   		<td><input type="text" name="bride" id="bride" size="50" value="<%=(card != null ? card.getBride() : "")%>" /></td>
   	</tr>
   	<tr>
   		<td><label for="cover_photo_url">图标照片文件名：</label></td>
   		<td><input type="text" name="cover_photo_url" id="cover_photo_url" size="50" value="<%=(card != null ? card.getCoverPhotoUrl() : "")%>" /></td>
   	</tr>
   	<tr>
   		<td><label for="page_photo_url">页面照片文件名：</label></td>
   		<td><input type="text" name="page_photo_url" id="page_photo_url" size="50" value="<%=(card != null ? card.getPagePhotoUrl() : "")%>" /></td>
   	</tr>
   	<tr>
   		<td><label for="wedding_date_desc">详细时间（比如：2013年11月24日中午11点半）：</label></td>
   		<td><input type="text" name="wedding_date_desc" id="wedding_date_desc" size="50"value="<%=(card != null ? card.getWeddingDateDesc() : "")%>" /></td>
   	</tr>
   	<tr>
   		<td><label for="place_name">酒店名称：</label></td>
   		<td><input type="text" name="place_name" id="place_name" size="50" value="<%=(card != null ? card.getPlaceName() : "")%>" /></td>
   	</tr>
   	<tr>
   		<td><label for="place_address">酒店地址：</label></td>
   		<td><input type="text" name="place_address" id="place_address" size="50" value="<%=(card != null ? card.getPlaceAddress() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="place_longitude">酒店地点经度：</label></td>
   		<td><input type="text" name="place_longitude" id="place_longitude" size="50" value="<%=(card != null ? card.getPlaceLongitude(): "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="place_latitude">酒店地点纬度：</label></td>
   		<td><input type="text" name="place_latitude" id="place_latitude" size="50" value="<%=(card != null ? card.getPlaceLatitude(): "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="place_phone">酒店电话：</label></td>
   		<td><input type="text" name="place_phone" id="place_phone" size="50" value="<%=(card != null ? card.getPlacePhone() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="note">请贴内容：</label></td>
   		<td><textarea name="note" id="note" cols="45" rows="6"><%=(card != null ? card.getNote() : "") %></textarea></td>
   	</tr>
   	<tr>
   		<td><label for="music_url">背景音乐文件名：</label></td>
   		<td><input type="text" name="music_url" id="music_url" size="50" value="<%=(card != null ? card.getMusicUrl(): "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="video_url">视频链接：</label></td>
   		<td><input type="text" name="video_url" id="video_url" size="50" value="<%=(card != null ? card.getVideoUrl() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="story">爱情故事：</label></td>
   		<td><textarea name="story" id="story" cols="45" rows="8"><%=(card != null ? card.getStory() : "") %></textarea></td>
   	</tr>
   	<tr>
   		<td><label for="agent_name">婚庆或代理公司名称</label></td>
   		<td><input type="text" name="agent_name" id="agent_name" size="50" value="<%=(card != null ? card.getAgentName() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="agent_weixin">婚庆或代理公司微信</label></td>
   		<td><input type="text" name="agent_weixin" id="agent_weixin" size="50" value="<%=(card != null ? card.getAgentWeixin() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="agent_qcode_path">婚庆或代理公司微信QR图文件名</label></td>
   		<td><input type="text" name="agent_qcode_path" id="agent_qcode_path" size="50" value="<%=(card != null ? card.getAgentQcodePath() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="agent_website">婚庆或代理公司网址</label></td>
   		<td><input type="text" name="agent_website" id="agent_website" size="50" value="<%=(card != null ? card.getAgentWebsite() : "") %>" /></td>
   	</tr>
   	
   	<!-- photos -->
   	<tr>
   		<td><label for="p1">照片1</label></td>
   		<td><input type="text" name="p1" id="p1" size="50" value="<%=(photos != null && photos.size() > 0 ? photos.get(0).getUrl() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="p2">照片2</label></td>
   		<td><input type="text" name="p2" id="p2" size="50" value="<%=(photos != null && photos.size() > 1 ? photos.get(1).getUrl() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="p3">照片3</label></td>
   		<td><input type="text" name="p3" id="p3" size="50" value="<%=(photos != null && photos.size() > 2 ? photos.get(2).getUrl() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="p4">照片4</label></td>
   		<td><input type="text" name="p4" id="p4" size="50" value="<%=(photos != null && photos.size() > 3 ? photos.get(3).getUrl() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="p5">照片5</label></td>
   		<td><input type="text" name="p5" id="p5" size="50" value="<%=(photos != null && photos.size() > 4 ? photos.get(4).getUrl() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="p6">照片6</label></td>
   		<td><input type="text" name="p6" id="p6" size="50" value="<%=(photos != null && photos.size() > 5 ? photos.get(5).getUrl() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="p7">照片7</label></td>
   		<td><input type="text" name="p7" id="p7" size="50" value="<%=(photos != null && photos.size() > 6 ? photos.get(6).getUrl() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="p8">照片8</label></td>
   		<td><input type="text" name="p8" id="p8" size="50" value="<%=(photos != null && photos.size() > 7 ? photos.get(7).getUrl() : "") %>" /></td>
   	</tr>
    <tr>
   		<td></td>
   		<td><input type="submit" value="保存"/> &nbsp;&nbsp;<a href="home.html">返回</a></td>
   	</tr>
    </table>
    </form>
</div>
</body>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
</html>