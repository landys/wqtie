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
			<div class="t2_bg public_bg">
				<p class="location_pic">
					我要<br>签到
				</p>
				<div class="location_main">
					<div class="guests_box">
						<form action="add_feedback.html?cid=<%=cardId%>"
							method="post">
							<h3 class="interactive01" style="margin-bottom: 10px;">贵宾签到</h3>
							<p id="errorMessage" style="color:black; display:none"></p>
							<div>
								<input id="guest" name="guest" type="text"
									class="scene_txt scene_txt01" placeholder="请输入您的大名">
							</div>
							<div style="margin-top: 10px;">
								<input type="text" id="phone" name="phone" class="scene_txt scene_txt01"
									placeholder="请输入您的手机号">
							</div>
							<span class="interactive_span">
							<label for="attendees">参加人数：</label>&nbsp;&nbsp;
							<select id="attendees" name="attendees">
								<option value="0">0</option>
								<option value="1" selected="selected">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
							</select>
							</span>
							<div>
								<textarea id="wish" name="wish" class="scene_area" placeholder="送祝福"></textarea>
							</div>
							<div>
								<input id="submit" name="submit" type="button" value="确定" class="sceneBtn" onclick="onSubmitFeedback();"/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!--婚礼模版二-->
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
<script src="js/core.js"></script>
<script type="text/JavaScript">
/*var sendWeixinMsg = function(title, desc) {
	var attendees = $('$attendees').val();
	var msg = ('#guest').val() + "（" + $('#phone').val() + "）";
	if (attendees == 0) {
		msg += "不能参加婚礼，但是发来祝福：";
	}
	else {
		msg += "将参加你们的婚礼，人数为" + attendees + "，并发来祝福：";
	}
	msg += $('#wish').val();

	WeixinJSBridge.invoke('sendAppMessage', {
		//"appid":appId,
		//"img_url":imgUrl,
		//"img_width":"640",
		//"img_height":"640",
		//"link":link,
		"desc":msg,
		"title":"来自" + ('#guest').val() + "的祝福"
		});
	}
*/

var hideErrorMessage = function() {
	$('#errorMessage').css('display', 'none');
}

var showErrorMessage = function(msg) {
	$('#errorMessage').html(msg);
	$('#errorMessage').css('display', 'block');
}

var onSubmitFeedback = function() {
	if (!validate_require($('#guest').val())) {
		showErrorMessage("请先输入您的称呼。");
		return;
	}
	
	if (!validate_require($('#phone').val())) {
		showErrorMessage("请先输入您的号码。");
		return;
	}
	
	if (!validate_require($('#wish').val())) {
		showErrorMessage("请先输入您的祝福。");
		return;
	}
	
	hideErrorMessage();
	$.ajax({type: 'POST', 
		url: 'add_feedback.rmt',
		data: {cid:<%=cardId%>,
			guest:$('#guest').val(), 
			phone:$('#phone').val(), 
			attendees:$('#attendees').val(),
			wish:$('#wish').val()},
		dataType: "text",
		success: function(message) {
			if ($.trim(message) != "") {
				if (message == "YES") {
					window.alert("签到成功，感谢您的祝福！");
					window.location.href = "t2.html?cid=<%=cardId%>";
				} else {
					showErrorMessage("签到失败，请检查网络！");
				}
			} else {
				showErrorMessage("签到失败，请检查网络！");
			}
		}});
};
</script>
</html>