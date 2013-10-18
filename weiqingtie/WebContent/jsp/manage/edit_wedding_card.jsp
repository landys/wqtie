<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.wqt.model.Asset"%>
<%@page import="com.wqt.model.Place"%>
<%@page import="com.wqt.model.Agent"%>
<%@page import="com.wqt.util.AppUtils"%>
<%@page import="com.wqt.model.WeddingCard"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>请贴编辑</title>

<script src="js/library/jquery-1.8.3.min.js"></script>
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
Agent agent = null;
long cardId = -1;
Place place = null;
Asset template = null;
Asset music = null;
ArrayList<Asset> photos = null;

if (card != null) {
	cardId = card.getCardId();
	agent = card.getAgent();
	place = card.getPlace();
	template = card.getTemplate();
	music = card.getMusic();
	photos = card.getPhotos();
}

List<Agent> agents = (List<Agent>)request.getAttribute("agents");
List<Asset> musics = (List<Asset>)request.getAttribute("musics");
List<Asset> templates = (List<Asset>)request.getAttribute("templates");
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
   		<td><label for="wedding_date">日期（年-月-日，如2013-11-24）：</label></td>
   		<td><input type="text" name="wedding_date" id="wedding_date" size="50" value="<%=(card != null && card.getWeddingDate() != null ? AppUtils.dateToSimpleString(card.getWeddingDate()) : "")%>" /></td>
   	</tr>
   	<tr>
   		<td><label for="wedding_date_desc">时间描述（比如：2013年11月24日中午11点半）：</label></td>
   		<td><input type="text" name="wedding_date_desc" id="wedding_date_desc" size="50"value="<%=(card != null ? card.getWeddingDateDesc() : "")%>" /></td>
   	</tr>
   	<tr>
   		<td><label for="place_name">酒店名称：</label></td>
   		<td><input type="text" name="place_name" id="place_name" size="50" value="<%=(place != null ? place.getName() : "")%>" /></td>
   	</tr>
   	<tr>
   		<td><label for="place_address">酒店地址：</label></td>
   		<td><input type="text" name="place_address" id="place_address" size="50" value="<%=(place != null ? place.getAddress() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="place_url">酒店百度地图链接：</label></td>
   		<td><input type="text" name="place_url" id="place_url" size="50" value="<%=(place != null ? place.getUrl(): "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="place_phone">酒店电话：</label></td>
   		<td><input type="text" name="place_phone" id="place_phone" size="50" value="<%=(place != null ? place.getPhone() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="note">请贴内容：</label></td>
   		<td><textarea name="note" id="note" cols="45" rows="6"><%=(card != null ? card.getNote() : "") %></textarea></td>
   	</tr>
   	<tr>
   		<td><label for="template_id">模板：</label></td>
   		<td><select name="template_id" id="template_id">
<%
for (Asset a : templates) {
%>
			<option value="<%=a.getAssetId() %>" selected="selected"><%=a.getTitle() %></option>
<%
}
%>
			</select></td>
   	</tr>
   	<tr>
   		<td><label for="music_id">音乐歌曲：</label></td>
   		<td><select name="music_id" id="music_id">
<%
for (Asset a : musics) {
%>
			<option value="<%=a.getAssetId() %>" selected="selected"><%=a.getTitle() %></option>
<%
}
%>
			</select></td>
   	</tr>
   	<tr>
   		<td><label for="video">视频链接：</label></td>
   		<td><input type="text" name="video" id="video" size="50" value="<%=(card != null ? card.getVideo() : "") %>" /></td>
   	</tr>
   	<tr>
   		<td><label for="story">爱情故事：</label></td>
   		<td><textarea name="story" id="story" cols="45" rows="8"><%=(card != null ? card.getNote() : "") %></textarea></td>
   	</tr>
   	<tr>
   		<td><label for="agent_id">婚庆公司</label></td>
   		<td><select name="agent_id" id="agent_id">
<%
for (Agent a : agents) {
%>
			<option value="<%=a.getAgentId() %>" selected="selected"><%=a.getName() %></option>
<%
}
%>
			</select></td>
   	</tr>
    <tr>
   		<td></td>
   		<td><input type="submit" value="保存"/> &nbsp;&nbsp;<a href="home.html">返回</a></td>
   	</tr>
    </table>
    </form>
</div>
</body>
</html>