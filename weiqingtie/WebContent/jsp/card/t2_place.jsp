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
					喜宴<br>地图
				</p>
				<div class="location_main">
					<p>
						<%=card != null ? card.getWeddingDateDesc() : "" %><br><%=place != null ? place.getAddress() : "" %>
					</p>
					<div id="container"
						style="width: 100%; margin: auto; height: 300px; border: 1px solid rgb(255, 0, 0); overflow: hidden; position: relative; z-index: 0; background-color: rgb(243, 241, 236); color: rgb(0, 0, 0); text-align: left;">
						
						<a href='http://api.map.baidu.com/geocoder?address=上海虹桥机场&output=html' target='_blank'> <img style="margin:2px" width="400" height="300" 
						src="http://api.map.baidu.com/staticimage?width=400&height=300&zoom=11&er=上海虹桥机场" />  
						</a> 
						
					</div>
					<!--  <p>
						<a
							href="http://api.map.baidu.com/marker?location=40.000051,116.393094&title=%E5%85%B8%E7%A4%BC%E5%9C%B0%E7%82%B9&content=%E4%B8%AD%E5%9B%BD%E5%8C%97%E4%BA%AC%E6%9C%9D%E9%98%B3%E5%8C%BA%E5%8C%97%E5%9B%9B%E7%8E%AF%E4%B8%AD%E8%B7%AF27%E5%8F%B7%EF%BC%8C%E7%9B%98%E5%8F%A4%E5%A4%A7%E8%A7%82&output=html">【点击地图进入动态地图导航】</a>
					</p>-->
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