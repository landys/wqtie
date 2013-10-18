<%@page import="com.wqt.util.AppUtils"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.wqt.model.Place"%>
<%@page import="com.wqt.model.Asset"%>
<%@page import="com.wqt.model.Agent"%>
<%@page import="com.wqt.model.WeddingCard"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%
	WeddingCard card = (WeddingCard) request
			.getAttribute("weddingCard");
	Agent agent = null;
	long cardId = -1;
	Place place = null;
	Asset template = null;
	Asset music = null;
	List<Asset> photos = null;

	if (card != null) {
		cardId = card.getCardId();
		agent = card.getAgent();
		place = card.getPlace();
		template = card.getTemplate();
		music = card.getMusic();
		photos = card.getPhotos();
	}
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><%=(card != null ? card.getTitle() : "")%></title>
<link href="css/core.css" rel="stylesheet" />
<link href="css/t2.css" rel="stylesheet" />
<script src="js/library/jquery-1.8.3.min.js"></script>
<script src="js/t2.js"></script>
</head>

<body title="<%=(card != null ? card.getTitle() : "")%>"
	icon="<%=(AppUtils.getWebSiteUrl(request) + "photos/p1.jpg") %>"
	link="<%=(AppUtils.getWebSiteUrl(request) + "card.html?cid=" + cardId) %>"
	desc="<%=(card != null ? card.getWeddingDateDesc() : "")%>&nbsp;<%=(place != null ? place.getAddress() : "")%>">
	<div class="t2">
		<div class="t2_content">
			<div class="t2_top">
				<a href="card.html?cid=<%=cardId%>"
					style="width: 50px; border-radius: 10px; margin-left: 10px; background: #EF1140; display: block; float: left;">返回</a><%=(card != null ? card.getTitle() : "")%>
				<a href="javascript:void(0);" id="music" onclick="stop();"><img
					id="music_button" style="float: right" src="images/music_stop.png"></a>
				<audio id="video" autoplay="autoplay" loop>
				    <source src="http://weiqingtie.u.qiniudn.com/bylm.mp3" id="video_url_mp3" type="audio/mpeg">
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
			<div class="t2_bg public_bg">
				<p class="location_pic">
					我要<br>签到
				</p>
				<div class="location_main">
					<div class="guests_box">
						<form action="http://weiyaoqing.com/show/campaign/registration"
							method="post">
							<h3 class="interactive01" style="margin-bottom: 10px;">贵宾签到</h3>
							<div>
								<input name="real_name" type="text"
									class="scene_txt scene_txt01" placeholder="请输入您的大名">
							</div>
							<div style="margin-top: 10px;">
								<input type="number" name="mobile" class="scene_txt scene_txt01"
									placeholder="请输入您的手机号">
							</div>
							<span class="interactive_span"><input type="radio"
								name="is_attend" value="1">参加&nbsp;&nbsp;<input
								type="radio" name="is_attend" value="2">不参加</span>
							<div>
								<textarea name="comment" class="scene_area" placeholder="送祝福"></textarea>
							</div>
							<input type="hidden" name="campaign_id" id="campaign_id" value="">
							<input type="hidden" name="type" id="type" value="1"> <input
								type="hidden" name="tid" id="tid" value="2"> <input
								type="hidden" name="is_ajax" id="is_ajax" value="0">
							<div>
								<input name="" type="submit" value="确定" class="sceneBtn">
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
				本喜帖由“<a class="about_color" href="http://weiqingtie.com/"
					target="_blank">微请贴</a>”幸福提供<br> 关注微信公众账号“<span
					class="about_color">weiqingtie</span>”获取专属微信喜帖 
			</p>
			<!-- <a class="about_color" href="http://weiqingtie.com/" target="_blank"><img
				style="width: 80px;" src="images/weixin.jpg"></a> -->
		</div>
</body>
</html>