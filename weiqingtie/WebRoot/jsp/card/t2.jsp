<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.wqt.model.Place"%>
<%@page import="com.wqt.model.Asset"%>
<%@page import="com.wqt.model.Agent"%>
<%@page import="com.wqt.model.WeddingCard"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
    <title>罗密欧和朱丽叶的结婚喜帖</title>
    <link href="/themes/base.css" rel="stylesheet">
    <link href="/themes/stencil_second.css" rel="stylesheet">
    <script src="/scripts/library/jquery-1.8.3.min.js"></script>
    <script src="/scripts/weiqingtie.js"></script>
</head>
<%
WeddingCard card = (WeddingCard)request.getAttribute("weddingCard");
Agent agent = null;
long cardId = -1;
Place place = null;
Asset template = null;
Asset music = null;
List<Asset> videos = null;
Asset video = null;
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
<body title="罗密欧和朱丽叶的结婚喜帖" icon="/photos/p1.jpg" link="t2.html?cid=<%=cardId %>" desc="2013年05月01日   中国北京朝阳区北四环中路27号，盘古大观">
<div class="stencilBox_second">
    <div class="stencilBox_second_content">
        <div class="stencilBox_second_top"><a href="t2.html?cid=<%=cardId %>" style="width:50px; border-radius:10px; margin-left:10px;background:#EF1140;display:block;float:left;">返回</a>罗密欧和朱丽叶的结婚喜帖
<a href="javascript:void(0);" id="music" onclick="stop();"><img id="music_button" style="float: right" src="/themes/images/music_stop.png"></a>
<audio id="video" autoplay="autoplay" loop="">
    <!--{<source src="" type="audio/ogg">}-->
    <source src="http://weiyaoqing.u.qiniudn.com/music/BecauseYouLovedMe.mp3" id="video_url_mp3" type="audio/mpeg">
</audio>
<script>
    var isaoto = 0;
    function stop(){
        var myVideo = document.getElementById("video");
        var button = document.getElementById("music_button");
        if(!myVideo.paused){
            myVideo.pause();
            button.src = "/themes/images/music_but.png";
        } else {
            myVideo.play();
            button.src = "/themes/images/music_stop.png";
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
     <div class="stencilBox_second_bg stencilBox_second_bg_one">
          <div class="stencil_second_nav">
              <ul class="stencil_second_nav_a">
                 <li><a href="feedback.html?cid=<%=cardId %>" class="a1">我要<br>签到</a></li>
                 <li><a href="photos.html?cid=<%=cardId %>" class="a2">婚纱<br>照片</a></li>
                 <li><a href="story.html?cid=<%=cardId %>" class="a3">爱情<br>故事</a></li>
                 <li><a href="place.html?cid=<%=cardId %>" class="a4">婚礼<br>地点</a></li>
              </ul>
          </div>

     </div>
    </div>
    <div>
        <div class="mypic" style="text-align: center;">
           <%=(card != null ? card.getWeddingDateDesc() : "")%>
            <!--<script type="text/javascript">-->
                <!--var __qqClockShare = {-->
                    <!--content: "明天是爱爱啊和恨恨恨的婚礼。记得准时参加哦",-->
                    <!--time: "2013-10-11 9:00",-->
                    <!--advance: 0,-->
                    <!--url: "http://weiyaoqing.com/10245",-->
                    <!--icon: "1_1"-->
                <!--};-->
                <!--document.write('<a href="http://qzs.qq.com/snsapp/app/bee/widget/open.htm#content=' + encodeURIComponent(__qqClockShare.content) +'&time=' + encodeURIComponent(__qqClockShare.time) +'&advance=' + __qqClockShare.advance +'&url=' + encodeURIComponent(__qqClockShare.url) + '" target="_blank" style="color:blue;">用QQ提醒我参加</a>');-->
            <!--</script>-->
            <br><%=(place != null ? place.getAddress() : "") %>
        </div>
        <div class="mypic">
            <div style="line-height:20px;padding:10px;font-size: 16px;">
                敬邀：各位亲朋好友<br>
                新郎：<%=(card != null ? card.getGroom() : "")%><br>
                新娘：<%=(card != null ? card.getBride() : "")%><br>
                <p style="text-indent: 2em;">
                   <%=(card != null ? card.getNote() : "") %>
                </p>
            </div>
                        <div>
                <iframe style="width: 90%;margin: 0 10px;" frameborder="0" src="/static/player.htm" allowfullscreen=""></iframe>
            </div>
                    </div>
</div>
<div style="text-align: center;border-top: solid 1px">
<p>本喜帖由“<a class="about_color" href="http://weiqingtie.com/" target="_blank">微请贴</a>”幸福提供<br>
    关注微信公众账号“<span class="about_color">weiqingtie</span>”获取专属微信喜帖</p>
    <a class="about_color" href="http://weiqingtie.com/" target="_blank"><img style="width: 80px;" src="/themes/images/weixin.jpg"></a>
</div>




</div></body></html>