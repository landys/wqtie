<%@page import="com.wqt.model.WeddingCard"%>
<%@page import="java.util.List"%>
<%@page import="com.wqt.model.User"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>微请帖管理</title>
<link rel="shortcut icon" href="images/favicon.ico" />
</head>

<body>
<%
User user = (User)request.getSession().getAttribute("loginUser");
String userName = null;
List<WeddingCard> cards = null;
int nCards = 0;
if (user != null) {
	userName = user.getUserName();
	cards = user.getWeddingCards();
	if (cards != null) {
		nCards = cards.size();
	}
}
%>
<div id="divUser">
   <p>欢迎<b><%=userName %></b>&nbsp;<a href="logout.html">退出</a></p>
</div>
<div id="divCards">
   <h2><a href="edit_card.html">创建新请帖</a></h2>
   <h2>请贴列表 (<%=nCards %>)</h2>
<%
if (nCards > 0) {
%>
   <table>
   	<tr>
   		<td><label>请贴标题</label></td>
   		<td><label>新郎</label></td>
   		<td><label>新娘</label></td>
   		<td><label>婚期</label></td>
   		<td><label>酒店</label></td>
   		<td colspan="3"><label>操作</label></td>
   	</tr>
<%
	for (WeddingCard card : cards) {
%>
   	<tr>
   		<td><label><%=card.getTitle() %></label></td>
   		<td><label><%=card.getGroom() %></label></td>
   		<td><label><%=card.getBride() %></label></td>
   		<td><label><%=card.getWeddingDateDesc() %></label></td>
   		<td><label><%=card.getPlaceName() %></label></td>
   		<td><a href="t1.html?cid=<%=card.getCardId()%>">预览1</a></td>
   		<td><a href="t2.html?cid=<%=card.getCardId()%>">预览2</a></td>
   		<td><a href="edit_card.html?cid=<%=card.getCardId()%>">编辑信息</a></td>
   		<!-- <td><a href="edit_photos.html?cid=<%=card.getCardId()%>">编辑照片</a></td>-->
   		<!-- <td><a href="#" onclick="onDelete();">删除</a></td>-->
   	</tr>
<%
	}
%>
   </table>
<%
}
%>
</div>
</body>
<script type="text/javascript">
var onDelete = function() {
	//delete_card.html?cid=card.getCardId()
}
</script>
</html>