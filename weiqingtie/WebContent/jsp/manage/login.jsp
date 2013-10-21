<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>微请帖登录</title>
</head>

<body>
<div id="divLogin">
   <h2>会员登录</h2>
<%
String errorMessage = (String)request.getAttribute("errorMessage");
if (errorMessage != null && errorMessage.trim().length() > 0) {
%>
   <span style="color:red"><%=errorMessage%></span>
<%
}
%>
   <form method="post" action="login.html">
   <table>
   	<tr>
   		<td><label for="username">用户名：</label></td>
   		<td><input type="text" name="username" id="username" /></td>
   	</tr>
    <tr>
   		<td><label for="password">密码：</label></td>
   		<td><input type="password" name="password" id="password" /></td>
   	</tr>       
    <tr>
   		<td colspan="2"><input type="submit" value="登录"/></td>
   	</tr>
    </table>
    </form>
</div>
</body>
<script src="http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js"></script>
</html>