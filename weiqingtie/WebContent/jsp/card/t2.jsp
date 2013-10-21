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
</head>

<body title="<%=(card != null ? card.getTitle() : "")%>"
	icon="<%=card != null ? AppUtils.AssetSitePrefix + card.getCoverPhotoUrl() : "" %>"
	link="<%=(AppUtils.getWebSiteUrl(request) + "card.html?cid=" + cardId) %>"
	desc="<%=(card != null ? card.getWeddingDateDesc() : "")%>&nbsp;<%=(card != null ? card.getPlaceAddress() : "")%>">
	<div class="t2">
		<div class="t2_content">
			<div class="t2_top">
				<a href="card.html?cid=<%=cardId%>" 
					style="width: 50px; border-radius: 10px; margin-left: 10px; background: #EF1140; display: block; float: left; visibility: hidden">返回</a><%=(card != null ? card.getTitle() : "")%>
				<a href="javascript:void(0);" id="music" onclick="stop();"><img
					id="music_button" style="float: right" src="images/music_stop.png"></a>
				<audio id="video" autoplay="autoplay" loop>
				    <source src="<%=card != null ? AppUtils.AssetSitePrefix + card.getMusicUrl() : "" %>" id="video_url_mp3" type="audio/mpeg">
				</audio>
				<script>
				    var isaoto = 0;
				    function stop(){
				        var myVideo = document.getElementById("video");
				        var button = document.getElementById("music_button");
				        if(!myVideo.paused){
				            myVideo.pause();
				            button.src = "images/music_but.png";
				        } else {
				            myVideo.play();
				            button.src = "images/music_stop.png";
				        }
				    }
				    function play(){
				        var myVideo = document.getElementById("video");
				        myVideo.play();
				    }
				    document.ontouchstart = function(e){
				        if(isaoto ==0){
				            stop();
				            isaoto = 1;
				        }
				    }
				</script>
			</div>
			<div class="t2_bg t2_bg_one">
				<div class="t2_nav">
					<ul class="t2_nav_a">
						<li><a href="feedback.html?cid=<%=cardId%>" class="a1">我要<br />签到
						</a></li>
						<li><a href="photos.html?cid=<%=cardId%>" class="a2">爱的<br />相册
						</a></li>
						<li><a href="story.html?cid=<%=cardId%>" class="a3">爱情<br />故事
						</a></li>
						<li><a href="place.html?cid=<%=cardId%>" class="a4">喜宴<br />地图
						</a></li>
					</ul>
				</div>

			</div>
		</div>
		<div>
			<div class="mypic" style="text-align: center;">
				<%=(card != null ? card.getWeddingDateDesc() : "")%>
				<br><%=(card != null ? card.getPlaceAddress() : "")%>
			</div>
			<div class="mypic">
				<div style="line-height: 20px; padding: 10px; font-size: 16px;">
					敬邀：各位亲朋好友<br />
					新郎：<%=(card != null ? card.getGroom() : "")%><br />
					新娘：<%=(card != null ? card.getBride() : "")%><br />
					<p style="text-indent: 2em;">
						<%=(card != null ? card.getNote() : "")%>
					</p>
				</div>
				<%
					if (card != null && !AppUtils.checkEmptyString(card.getVideoUrl())) {
				%>
				<div>
					<iframe style="width: 94%; margin: 0 3%;" frameborder="0"
						src="<%=card.getVideoUrl()%>" allowfullscreen></iframe>
				</div>
				<%
					}
				%>
			</div>
		</div>
		<div style="text-align: center; border-top: solid 1px">
			<p>
				本喜帖由“<a class="about_color" href="<%=(card != null ? card.getAgentWebsite() : "")%>"
					target="_blank"><%=(card != null ? card.getAgentName() : "")%></a>”幸福提供<br> 关注微信公众账号“<span
					class="about_color"><%=(card != null ? card.getAgentWeixin() : "")%></span>”获取专属微信喜帖 
			</p>
			<!-- <a class="about_color" href="http://weiqingtie.com/" target="_blank"><img
				style="width: 80px;" src="images/weixin.jpg"></a> -->
		</div>
	</div>
</body>
<script src="http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js"></script>
<script src="js/wx.js"></script>
</html>