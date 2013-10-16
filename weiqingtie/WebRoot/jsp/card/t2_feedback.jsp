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
<body title="罗密欧和朱丽叶的结婚喜帖" icon="http://weiyaoqing.com/img/upload/case.1376325730.jpg" link="http://weiyaoqing.com/index.php/show/preview/registration/type/1/tid/2/cid" desc="2013年05月01日   中国北京朝阳区北四环中路27号，盘古大观">
<!--婚礼模版二-->
<div class="stencilBox_second">
    <div class="stencilBox_second_content">
        <div class="stencilBox_second_top"><a href="http://weiyaoqing.com/show/preview/index/type/1/tid/2/cid/" style="width:50px; border-radius:10px; margin-left:10px;background:#EF1140;display:block;float:left;">返回</a>罗密欧和朱丽叶的结婚喜帖
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
         <div class="stencilBox_second_bg public_bg">
            <p class="location_pic">我要<br>签到</p>
     <div class="location_main">
        <div class="guests_box">
            <form action="http://weiyaoqing.com/show/campaign/registration" method="post">
                <h3 class="interactive01" style="margin-bottom:10px;">贵宾签到</h3>
                <div><input name="real_name" type="text" class="scene_txt scene_txt01" placeholder="请输入您的大名"></div>
                <div style="margin-top:10px;"><input type="number" name="mobile" class="scene_txt scene_txt01" placeholder="请输入您的手机号"></div>
                <span class="interactive_span"><input type="radio" name="is_attend" value="1">参加&nbsp;&nbsp;<input type="radio" name="is_attend" value="2">不参加</span>
                <div><textarea name="comment" class="scene_area" placeholder="送祝福"></textarea></div>
                <input type="hidden" name="campaign_id" id="campaign_id" value="">
                <input type="hidden" name="type" id="type" value="1">
                <input type="hidden" name="tid" id="tid" value="2">
                <input type="hidden" name="is_ajax" id="is_ajax" value="0">
                <div><input name="" type="submit" value="确定" class="sceneBtn">
                </div>
            </form>
        </div>
     </div>
         </div>
    </div>
</div>

<!--婚礼模版二-->
<div style="text-align: center;border-top: solid 1px">
<p>本喜帖由“<a class="about_color" href="http://weiyaoqing.com/" target="_blank">微邀请</a>”幸福提供<br>
    关注微信公众账号“<span class="about_color">vyaoqing</span>”获取专属微信喜帖</p>
    <a class="about_color" href="http://weiyaoqing.com/" target="_blank"><img style="width: 80px;" src="/themes/images/weixin.jpg"></a>
</div>




</body></html>