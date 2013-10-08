<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
<title>微请帖管理</title>
<script src="../scripts/library/jquery.js"></script>
</head>

<body>
<div id="divUser">
   <p>欢迎<b><%=request.getSession().getAttribute("loginUserName") %></b>&nbsp;<a href="/logout.html">退出</a></p>
</div>
<div id="divCards">
   <h2>请贴列表</h2>
   <table>
   	<tr>
   		<td><label for="username">用户名：</label></td>
   		<td><input type="text" name="name" id="username" /></td>
   	</tr>
   	<tr>
   		<td><label for="phonenumber">手机号码：</label></td>
   		<td><input type="text" name="phonenumber" id="phonenumber" /></td>
   	</tr>
    <tr>
   		<td><label for="password">密码：</label></td>
   		<td><input type="password" name="password" id="password" /></td>
   	</tr>   
    </table>
</div>
</body>
</html>