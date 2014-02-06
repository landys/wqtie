var isaoto = 0;
function stop(){
    var myMusic = document.getElementById("music");
    var button = document.getElementById("btnPlay");
    if(!myMusic.paused){
        myMusic.pause();
        button.src = "/Public/images/start.png";
    } else {
        myMusic.play();
        button.src = "/Public/images/stop.png";
    }
}

function play(){
    var myMusic = document.getElementById("music");
    myMusic.play();
}

document.ontouchstart = function(e){
    if(isaoto ==0){
        stop();
        isaoto = 1;
    }
};

var validate_require = function(data) {
    return ($.trim(data).length > 0);
};

var phone_pattern = /^1[35]\d{9}$/;
var validate_phonenumber = function(data) {
    var v = $.trim(data);
    return (v != '' && phone_pattern.test(v));
};

var email_pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var validate_email = function(data) {
    var v = $.trim(data);
    return (v != '' && email_pattern.test(v));
};

var hideMessage = function() {
	$('#fb_message').html("&nbsp;");
};

var showErrorMessage = function(msg) {
	var div = $('#fb_message');
	div.html(msg);
	div.css('color', 'yellow');
	div.css('font-size', '12px');
};

var showMessage = function(msg) {
	var div = $('#fb_message');
	div.html(msg);
	div.css('color', 'blue');
	div.css('font-size', '14px');
};

var onSubmitFeedback = function(cid) {
	if (!validate_require($('#guest').val())) {
		showErrorMessage("请先输入您的大名。");
		return;
	}
	
	if (!validate_require($('#phone').val())) {
		showErrorMessage("请先输入您的手机号。");
		return;
	}
	
	/*if (!validate_require($('#wish').val())) {
		showErrorMessage("请先输入您的祝福。");
		return;
	}*/
	
	//hideMessage();
	showMessage("正在提交签到，请稍候。。。");
	$.ajax({type: 'POST', 
		url: '/card/add_feedback',
		data: {cid:cid,
			guest:$('#guest').val(), 
			phone:$('#phone').val(), 
			attendees:$('#attendees').val(),
			wish:$('#wish').val()},
		dataType: "json",
		success: function(result) {
			if (result && result.status) {
				showMessage("签到成功，感谢您的祝福！");
			} else {
				showErrorMessage("签到失败，请检查网络！");
			}
		}});
};

var mapInited = false;
//创建和初始化地图函数：
function initMap(){
	mapInited = true;
    createMap(longitude, latitude);//创建地图
    resetMap();
}

function resetMap() {
	setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMarker();//向地图中添加marker
}

//创建地图函数：
function createMap(longitude, latitude){
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    var point = new BMap.Point(longitude, latitude);//定义一个中心点坐标
    map.centerAndZoom(point,12);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
    //向地图中添加缩放控件
var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
map.addControl(ctrl_sca);
}


//创建marker
function addMarker(){
    for(var i=0;i<markerArr.length;i++){
        var json = markerArr[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0,p1);
		var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point,{icon:iconImg});
		//var iw = createInfoWindow(i);
		var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
		marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
                    borderColor:"#808080",
                    color:"#333",
                    cursor:"pointer"
        });
		
		(function(){
			//var index = i;
			var _iw = createInfoWindow(i);
			var _marker = marker;
			_marker.addEventListener("click",function(){
			    this.openInfoWindow(_iw);
		    });
		    _iw.addEventListener("open",function(){
			    _marker.getLabel().hide();
		    });
		    _iw.addEventListener("close",function(){
			    _marker.getLabel().show();
		    });
			label.addEventListener("click",function(){
			    _marker.openInfoWindow(_iw);
		    });
			if(!!json.isOpen){
				label.hide();
				_marker.openInfoWindow(_iw);
			}
		})();
    }
}
//创建InfoWindow
function createInfoWindow(i){
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
    return iw;
}
//创建一个Icon
function createIcon(json){
    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)});
    return icon;
}

var hideAllDivs = function() {
	$('#divFeedback').css('display', 'none');
	$('#divPhotos').css('display', 'none');
	$('#divStory').css('display', 'none');
	$('#divPlace').css('display', 'none');
	hideMessage();
};

var animateToShowDiv = function (div) {
	var h = div.css('height');
	
	div.css('height', '0px');
	div.css('display', 'block');
	
	div.animate({height:h});
	
	if (!mapInited && div.attr('id') == 'divPlace') {
		initMap();
	}
};

//var animateToHideDiv = function (div) {
//	var h = div.css('height');
//	
//	div.animate({height:'0px'});
//	
//	div.css('display', 'none');
//	div.css('height', h);
//};

var divClicked = function(divId) {
	var div = $('#'+divId);
	if (div.css('display') == 'none') {
		hideAllDivs();
		animateToShowDiv(div);
	}
	else {
		hideAllDivs();
		//animateToHideDiv(div);
	}
};

$(function(){
    $('#begin').click(function(){
        $(this).slideUp('slow');
        var myMusic = document.getElementById("music");
        myMusic.play();
    });
    
});

