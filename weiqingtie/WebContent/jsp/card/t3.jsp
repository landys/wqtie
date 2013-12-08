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
<link href="css/t3.css" rel="stylesheet" />
<link rel="shortcut icon" href="images/favicon.ico" />
</head>

<body title="<%=(card != null ? card.getTitle() : "")%>"
	icon="<%=card != null ? AppUtils.getAssetSitePrefix() + card.getCoverPhotoUrl() : "" %>"
	link="<%=(AppUtils.getWebSiteUrl(request) + "t3.html?cid=" + cardId) %>"
	desc="<%=(card != null && card.getGroom() != null ? card.getGroom() : "")%>&#9825;<%=(card != null && card.getGroom() != null ? card.getBride() : "")%>
<%=(card != null ? card.getWeddingDateDesc() : "")%>">
	<div class="t" data-role="page">
		<div data-role="content">
			<div class="t_content">
				<div class="t_top">
					&nbsp;&nbsp;<%=(card != null ? card.getTitle() : "")%>
					<a href="javascript:void(0);" onclick="stop();"><img
						id="btnPlay" style="float: right" src="images/stop.png"></a>
					<audio id="music" autoplay="autoplay" loop>
					    <source src="<%=card != null ? AppUtils.getAssetSitePrefix() + card.getMusicUrl() : "" %>" id="music_url_mp3" type="audio/mpeg">
					</audio>
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
			<div id="divPhotos">
	<%
	if (photos != null && photos.size() > 0) {
	%>
				<ul>
	<%
		for (Photo photo : photos) {
			if (photo != null && !AppUtils.checkEmptyString(photo.getUrl())) {
	%>
					<li><img src="<%=AppUtils.getAssetSitePrefix() + photo.getUrl() %>" width="100%"></li>
	<%
			}
		}
	%>
				</ul>
	<%
	}
	%>
			</div>
			
			<div>
				<div class="t_time_address" style="text-align: center;">
					<%=(card != null ? card.getWeddingDateDesc() : "")%>
					<br/><%=(card != null ? card.getPlaceAddress() : "")%>
				</div>
				<div class="t_note">
					<br/>敬邀：各位亲朋好友<br />
					新郎：<%=(card != null ? card.getGroom() : "")%><br />
					新娘：<%=(card != null ? card.getBride() : "")%><br />
					<p style="text-indent: 2em;">
						<%=(card != null ? card.getNote() : "")%>
					</p>
					<br/>
				</div>
			</div>
			
				<!--  <div class="t_img">
		           <img src="<%= AppUtils.getAssetSitePrefix() + card.getPagePhotoUrl()%>" class="p_img"></img></div>-->
		       <!--  <div class="t_nav">
		           <ul>
		               <li style="background-color: #cc9966; width:33.3%"><p><a href="javascript:void(0);" onclick="divClicked('divFeedback');">我要<br />签到</a></p></li>
		               <li style="background-color: #ffcccc; width:33.3%"><p><a href="javascript:void(0);" onclick="divClicked('divStory');">爱情<br />故事</a></p></li>
		               <li style="background-color: #cccc66; width:33.3%"><p><a href="javascript:void(0);" onclick="divClicked('divPlace');">喜宴<br />地图</a></p></li>
		           </ul>
		       </div>
		       -->
				<div style="background-color: #cc9966" class="nav_item" onclick="divClicked('divFeedback');">
		       		<a href="javascript:void(0);">我&nbsp;要&nbsp;签&nbsp;到</a>
				</div>
		       
		       <div id="divFeedback" class="guests_box div_border" style="display:none">
					<form action="add_feedback.rmt?cid=<%=cardId%>"
						method="post">
						<div>
							<input id="guest" name="guest" type="text"
								class="scene_txt" placeholder="请输入您的大名">
						</div>
						<div style="margin-top: 10px;">
							<input type="text" id="phone" name="phone" class="scene_txt"
								placeholder="请输入您的手机号">
						</div>
						<div style="margin-top: 10px;">
							<label for="attendees" class="lbl_attendees">参加人数：</label>&nbsp;&nbsp;&nbsp;
							<select id="attendees" name="attendees" class="sel_attendees">
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
						</div>
						<div style="margin-top: 10px;">
							<textarea id="wish" name="wish" class="scene_area" placeholder="送祝福"></textarea>
						</div>
						<p id="fb_message" class="p_error"></p>
						<div style="text-align:center;">
							<input id="submit" name="submit" type="button" value="确定" class="scene_btn" onclick="onSubmitFeedback(<%=cardId%>);"/>
						</div>
					</form>
				</div>		
				
				<div style="background-color: #ffcccc" class="nav_item" onclick="divClicked('divStory');">
		       		<a href="javascript:void(0);">爱&nbsp;情&nbsp;故&nbsp;事</a>
		       </div>	
				<div id="divStory" class="div_border" style="display:none">
					<p style="text-align:left; text-indent: 2em; font-size:14px;">
						<%=card != null ? card.getStory() : "" %>
					</p>
				</div>
			
			 	<div style="background-color: #cccc66" class="nav_item" onclick="divClicked('divPlace');">
		       		<a href="javascript:void(0);">喜&nbsp;宴&nbsp;地&nbsp;图</a>
		      	 </div>
				<div id="divPlace" class="div_border" style="display:none">
					<div id="dituContent" class="div_place"></div>
					<p style="text-align:center; margin-top:6px;">
						<a href="http://api.map.baidu.com/marker?location=<%=card!=null ? card.getPlaceLatitude() : ""%>,<%=card!=null ? card.getPlaceLongitude() : ""%>&title=<%=card!=null ? card.getPlaceName() : ""%>&content=<%=card!=null ? card.getPlaceAddress() : ""%>&output=html">【点击进入百度地图导航】</a>
					</p>
				</div>
			</div>
		</div>
		<div class="t_foot" data-role="foot">
			<p>
				本喜帖由“<a class="about_color" href="<%=(card != null ? card.getAgentWebsite() : "")%>"
					target="_blank"><%=(card != null ? card.getAgentName() : "")%></a>”幸福提供<br> 关注微信公众账号“<span
					class="about_color"><%=(card != null ? card.getAgentWeixin() : "")%></span>”获取专属微信喜帖 
			</p>
<%
if (card != null && !AppUtils.checkEmptyString(card.getAgentQcodePath())) {
%>
			<a class="about_color" href="javascript:void(0);" target="_blank"><img
				style="width: 80px;" src="<%= AppUtils.getAssetSitePrefix() + card.getAgentQcodePath()%>"></a>
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
	var markerArr = [{title:"<%=card!=null ? card.getPlaceName() : ""%>",content:"<%=card!=null ? card.getPlaceAddress() : ""%>",
			point:"<%=card!=null ? card.getPlaceLongitude() : ""%>|<%=card!=null ? card.getPlaceLatitude() : ""%>",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}];
	var longitude = <%=card!=null ? card.getPlaceLongitude() : ""%>;
	var latitude = <%=card!=null ? card.getPlaceLatitude() : ""%>;
	var hideAllDivs = function() {
		$('#divFeedback').css('display', 'none');
		$('#divStory').css('display', 'none');
		$('#divPlace').css('display', 'none');
		hideMessage();
	};
</script>
</html>