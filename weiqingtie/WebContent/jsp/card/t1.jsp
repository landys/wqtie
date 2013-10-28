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
		               <li style="background-color: #cc9966"><p><a href="#" onclick="divClicked('divFeedback');">我要<br />签到</a></p></li>
		               <li style="background-color: #ffcccc"><p><a href="#" onclick="divClicked('divPhotos');">爱的<br />相册</a></p></li>
		               <li style="background-color: #cccc66"><p><a href="#" onclick="divClicked('divStory');">爱情<br />故事</a></p></li>
		               <li style="background-color: #cc99cc"><p><a href="#" onclick="divClicked('divPlace');">喜宴<br />地图</a></p></li>
		           </ul>
		       </div>
		       
		       <div id="divFeedback" class="guests_box" style="display:none">
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
							<input id="submit" name="submit" type="button" value="确定" class="sceneBtn" onclick="onSubmitFeedback(<%=cardId%>);"/>
						</div>
					</form>
				</div>
				
				<div id="divPhotos" style="display:none">
		<%
		if (photos != null && photos.size() > 0) {
		%>
					<ul>
		<%
			for (Photo photo : photos) {
				if (photo != null && !AppUtils.checkEmptyString(photo.getUrl())) {
		%>
						<li style="background: lightgray;"><img src="<%=AppUtils.AssetSitePrefix + photo.getUrl() %>" width="100%"></li>
		<%
				}
			}
		%>
					</ul>
		<%
		}
		%>
				</div>
				
				<div id="divStory" style="display:none">
					<p class="location_pic">
						爱情<br>故事
					</p>
					<div class="location_main">
						<p style="text-align: left">
							<%=card != null ? card.getStory() : "" %>
						</p>
					</div>
				</div>
			
				<div id="divPlace" style="display:none">
					<div id="dituContent"
						style="width: 100%; margin: auto; height: 300px; border: 1px solid rgb(255, 0, 0); overflow: hidden; position: relative; z-index: 0; background-color: rgb(243, 241, 236); color: rgb(0, 0, 0); text-align: left;">
						<!-- <div style="width:697px;height:550px;border:#ccc solid 1px;" id="dituContent"></div>-->
					</div>
					<p>
						<a href="http://api.map.baidu.com/marker?location=<%=card!=null ? card.getPlaceLatitude() : ""%>,<%=card!=null ? card.getPlaceLongitude() : ""%>&title=<%=card!=null ? card.getPlaceName() : ""%>&content=<%=card!=null ? card.getPlaceAddress() : ""%>&output=html">【点击进入百度地图导航】</a>
					</p>
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
<script type="text/javascript" src="http://api.map.baidu.com/api?key=&v=1.1&services=true"></script>
<script src="js/wx.js"></script>
<script src="js/qingtie.js"></script>
<script type="text/javascript">
//标注点数组
var markerArr = [{title:"<%=card!=null ? card.getPlaceName() : ""%>",content:"<%=card!=null ? card.getPlaceAddress() : ""%>",point:"<%=card!=null ? card.getPlaceLongitude() : ""%>|<%=card!=null ? card.getPlaceLatitude() : ""%>",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
	 ];
initMap(<%=card!=null ? card.getPlaceLongitude() : ""%>, <%=card!=null ? card.getPlaceLatitude() : ""%>);//创建和初始化地图
</script>
</html>