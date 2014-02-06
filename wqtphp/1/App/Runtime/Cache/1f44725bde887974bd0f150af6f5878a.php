<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo ($card["title"]); ?></title>
<link href="__ASSET_PUBLIC__/css/core.css" rel="stylesheet" />
<link href="__ASSET_PUBLIC__/css/t1.css" rel="stylesheet" />
<link rel="shortcut icon" href="__ASSET_PUBLIC__/images/favicon.ico" />
</head>

<body title="<?php echo ($card["title"]); ?>" icon="__UPLOADED_ASSET_PUBLIC__/<?php echo ($card["coverPhotoUrl"]); ?>"
	link="__SELF__"
	desc="<?php echo ($card["groom"]); ?>&#9825;<?php echo ($card["bride"]); ?>&#10;<?php echo ($card["weddingDateDesc"]); ?>">
	<div class="t" data-role="page">
		<div data-role="content">
			<div class="t_content">
				<div class="t_top">
					&nbsp;&nbsp;<?php echo ($card["title"]); ?> <a href="javascript:void(0);"
						onclick="stop();"><img id="btnPlay" style="float: right"
						src="__ASSET_PUBLIC__/images/stop.png"></a>
					<audio id="music" autoplay="autoplay" loop> <source
						src="__UPLOADED_ASSET_PUBLIC__/<?php echo ($card["musicUrl"]); ?>" id="music_url_mp3"
						type="audio/mpeg"></audio>
				</div>

				<?php if($card["videoUrl"] != null): ?><div>
					<iframe style="width: 100%; margin: 0 0;" frameborder="0"
						src="<?php echo ($card["videoUrl"]); ?>" allowfullscreen></iframe>
				</div><?php endif; ?>

				<div class="t_img">
					<img src="__UPLOADED_ASSET_PUBLIC__/<?php echo ($card["pagePhotoUrl"]); ?>" class="p_img"></img>
				</div>
				<div class="t_nav">
					<ul>
						<li style="background-color: #ffcccc"><p>
								<a href="javascript:void(0);" onclick="divClicked('divPhotos');">爱的<br />相册
								</a>
							</p></li>
						<li style="background-color: #cccc66"><p>
								<a href="javascript:void(0);" onclick="divClicked('divStory');">爱情<br />故事
								</a>
							</p></li>
						<li style="background-color: #cc99cc"><p>
								<a href="javascript:void(0);" onclick="divClicked('divPlace');">喜宴<br />地图
								</a>
							</p></li>
						<li style="background-color: #cc9966"><p>
								<a href="javascript:void(0);"
									onclick="divClicked('divFeedback');">我要<br />签到
								</a>
							</p></li>
					</ul>
				</div>

				<div id="divFeedback" class="guests_box div_border"
					style="display: none">
					<form action="add_feedback.rmt?cid=<?php echo ($cardId); ?>" method="post">
						<h3 class="h_item">贵宾签到</h3>

						<div>
							<input id="guest" name="guest" type="text" class="scene_txt"
								placeholder="请输入您的大名">
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
							<textarea id="wish" name="wish" class="scene_area"
								placeholder="送祝福"></textarea>
						</div>
						<p id="fb_message" class="p_error"></p>
						<div style="text-align: center;">
							<input id="submit" name="submit" type="button" value="确定"
								class="scene_btn" onclick="onSubmitFeedback(<?php echo ($cardId); ?>);" />
						</div>
					</form>
				</div>

				<div id="divPhotos" class="div_border" style="display: none">
					<?php if($nPhotos > 0): ?><ul>
						<?php if(is_array($photos)): $i = 0; $__LIST__ = $photos;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$photo): $mod = ($i % 2 );++$i; if($photo["url"] != null): ?><li><img src="__UPLOADED_ASSET_PUBLIC__/<?php echo ($photo["url"]); ?>" width="100%"></li><?php endif; endforeach; endif; else: echo "" ;endif; ?>
					</ul><?php endif; ?>
				</div>

				<div id="divStory" class="div_border" style="display: none">
					<h3 class="h_item">爱情故事</h3>
					<p style="text-align: left; text-indent: 2em; font-size: 14px;">
						<?php echo ($card["story"]); ?></p>
				</div>

				<div id="divPlace" class="div_border" style="display: none">
					<h3 class="h_item">喜宴地图</h3>
					<div id="dituContent" class="div_place"></div>
					<p style="text-align: center; margin-top: 6px;">
						<a
							href="http://api.map.baidu.com/marker?location=<?php echo ($card["placeLatitude"]); ?>,<?php echo ($card["placeLongitude"]); ?>&title=<?php echo ($card["placeName"]); ?>&content=<?php echo ($card["placeAddress"]); ?>&output=html">【点击进入百度地图导航】</a>
					</p>
				</div>
			</div>
			<div>
				<div class="t_time_address" style="text-align: center;">
					<?php echo ($card["weddingDateDesc"]); ?> <br /><?php echo ($card["placeAddress"]); ?>
				</div>
				<div class="t_note">
					<br />敬邀：各位亲朋好友<br /> 新郎：<?php echo ($card["groom"]); ?><br /> 新娘：<?php echo ($card["bride"]); ?><br />
					<p style="text-indent: 2em;"><?php echo ($card["note"]); ?></p>
					<br />
				</div>
			</div>
		</div>
		<div class="t_foot" data-role="foot">
			<p>
				本喜帖由“<a class="about_color" href="<?php echo ($card["agentWebsite"]); ?>"
					target="_blank"><?php echo ($card["agentName"]); ?></a>”幸福提供<br> 关注微信公众账号“<span
					class="about_color"><?php echo ($card["agentWeixin"]); ?></span>”获取专属微信喜帖 
			</p>
			<?php if($card["agentQcodePath"] != null): ?><a
				class="about_color" href="javascript:void(0);" target="_blank"><img
				style="width: 80px;" src="__UPLOADED_ASSET_PUBLIC__/<?php echo ($card["agentQcodePath"]); ?>"></a><?php endif; ?>
		</div>
	</div>
</body>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="http://api.map.baidu.com/api?key=&v=1.1&services=true"></script>
<script src="__ASSET_PUBLIC__/js/wx.js"></script>
<script src="__ASSET_PUBLIC__/js/qingtie.js"></script>
<script type="text/javascript">
	var placeName = "<?php echo ($card["placeName"]); ?>";
	var markerArr = [{title:placeName,content:"{$card.placeAddress}",
			point:"<?php echo ($card["placeLongitude"]); ?>|<?php echo ($card["placeLatitude"]); ?>",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}];
	var longitude = <?php echo ($card["placeLongitude"]); ?>;
	var latitude = <?php echo ($card["placeLatitude"]); ?>;
</script>
</html>