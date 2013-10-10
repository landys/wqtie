<%@page import="com.wqt.model.WeddingCard"%>
<%@page import="java.util.List"%>
<%@page import="com.wqt.model.User"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
<title>微请帖管理</title>
<script src="../scripts/library/jquery.js"></script>
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
   <p>欢迎<b><%=userName %></b>&nbsp;<a href="/logout.html">退出</a></p>
</div>
<div id="divCards">
   <h2><a href="/edit_card.html">创建新请帖</a></h2>
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
   		<td><label>操作</label></td>
   	</tr>
<%
	for (WeddingCard card : cards) {
%>
   	<tr>
   		<td><label><%=card.getTitle() %></label></td>
   		<td><label><%=card.getGroom() %></label></td>
   		<td><label><%=card.getBride() %></label></td>
   		<td><label><%=card.getWeddingDateDesc() %></label></td>
   		<td><label><%=card.getPlace() != null ? card.getPlace().getName() : "" %></label></td>
   		<td><table><tr>
   			<td><a href="/edit_card.html?card_id=<%=card.getCardId()%>">修改</a></td>
   			<td><a href="/delete_card.html?card_id=<%=card.getCardId()%>">删除</a></td>
   		</tr></table></td>
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
</html>