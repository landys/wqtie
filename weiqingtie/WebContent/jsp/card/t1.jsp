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
<link href="css/t1.css" rel="stylesheet" />
<link rel="shortcut icon" href="images/favicon.ico" />
</head>

<body title="<%=(card != null ? card.getTitle() : "")%>"
	icon="<%=card != null ? AppUtils.AssetSitePrefix + card.getCoverPhotoUrl() : "" %>"
	link="<%=(AppUtils.getWebSiteUrl(request) + "t1.html?cid=" + cardId) %>"
	desc="<%=(card != null ? card.getWeddingDateDesc() : "")%>&nbsp;<%=(card != null ? card.getPlaceAddress() : "")%>">
	<div class="t" data-role="page">
		<div data-role="content">
			<div class="t_content">
				<div class="t_top">
					<a href="t1.html?cid=<%=cardId%>" 
						style="width: 50px; border-radius: 10px; margin-left: 10px; background: #EF1140; display: block; float: left; visibility: hidden">返回</a><%=(card != null ? card.getTitle() : "")%>
					<a href="javascript:void(0);" id="music" onclick="stop();"><img
						id="btnPlay" style="float: right" src="images/stop.png"></a>
					<!--  <audio id="video" autoplay="autoplay" loop>
					    <source src="<%=card != null ? AppUtils.AssetSitePrefix + card.getMusicUrl() : "" %>" id="video_url_mp3" type="audio/mpeg">
					</audio>-->
				</div>
<%
	if (card != null && !AppUtils.checkEmptyString(card.getVideoUrl())) {
%>
				<div>
					<iframe style="width: 100%; margin: 0 0;" frameborder="0"
						src="<%=card.getVideoUrl()%>" allowfullscreen></iframe>
				</div>
<%
	}
%>
				<div class="t_img">
		           <img src="<%= AppUtils.AssetSitePrefix + card.getPagePhotoUrl()%>" class="p_img"></img></div>
		       <div class="t_nav">
		           <ul>
		               <li style="background-color: #cc9966"><p><a href="#">我要<br />签到</a></p></li>
		               <li style="background-color: #ffcccc"><p><a href="#">爱的<br />相册</a></p></li>
		               <li style="background-color: #cccc66"><p><a href="#">爱情<br />故事</a></p></li>
		               <li style="background-color: #cc99cc"><p><a href="#">喜宴<br />地图</a></p></li>
		           </ul>
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
				</div>
			</div>
		</div>
		<div style="text-align: center; border-top: solid 1px" data-role="foot">
			<p>
				本喜帖由“<a class="about_color" href="<%=(card != null ? card.getAgentWebsite() : "")%>"
					target="_blank"><%=(card != null ? card.getAgentName() : "")%></a>”幸福提供<br> 关注微信公众账号“<span
					class="about_color"><%=(card != null ? card.getAgentWeixin() : "")%></span>”获取专属微信喜帖 
			</p>
<%
if (card != null && !AppUtils.checkEmptyString(card.getAgentQcodePath())) {
%>
			<a class="about_color" href="#" target="_blank"><img
				style="width: 80px;" src="<%= AppUtils.AssetSitePrefix + card.getAgentQcodePath()%>"></a>
<%
}
%>
		</div>
	</div>
</body>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
<script src="js/wx.js"></script>
<script type="text/javascript">
	var isaoto = 0;
	function stop(){
	    var myVideo = document.getElementById("video");
	    var button = document.getElementById("btnPlay");
	    if(!myVideo.paused){
	        myVideo.pause();
	        button.src = "images/start.png";
	    } else {
	        myVideo.play();
	        button.src = "images/stop.png";
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
	
    $(function(){
        $('#begin').click(function(){
            $(this).slideUp('slow');
            var myVideo = document.getElementById("video");
            myVideo.play();
        });

    });
</script>
</html>