<?php
class WeddingCardModel extends Model {
	protected $trueTableName = 'tbl_wedding_card';

	protected $fields = array('cardId', 'userId', 'groom', 'bride', 'title', 'weddingDate',
			'weddingDateDesc', 'phone', 'weixin', 'note', 'story', 'videoUrl', 'musicUrl', 'coverPhotoUrl', 
			'pagePhotoUrl', 'pageImageUrl', 'placeName', 'placeAddress', 'placeUrl', 'placePhone', 
			'placeLongitude', 'placeLatitude', 'agentName', 'agentPhone', 'agentWeixin', 'agentQcodePath', 
			'agentWebSite', 'agentWeibo', 'status', 'createDate', '_pk' => 'cardId', '_autoinc' => true);
	
	protected $_map = array(
			'cover_photo_url' => 'coverPhotoUrl',
			'page_photo_url' => 'pagePhotoUrl',
			'page_image_url' => 'pageImageUrl',
			'wedding_date_desc' => 'weddingDateDesc',
			'place_name' => 'placeName',
			'place_address' => 'placeAddress',
			'place_longitude' => 'placeLongitude',
			'place_latitude' => 'placeLatitude',
			'place_phone' => 'placePhone',
			'music_url' => 'musicUrl',
			'video_url' => 'videoUrl',
			'agent_name' => 'agentName',
			'agent_weixin' => 'agentWeixin',
			'agent_qcode_path' => 'agentQcodePath',
			'agent_website' => 'agentWebSite'
	);
	/*protected $_link = array(
			'User' => array(
					'mapping_type' => BELONGS_TO,
					'class_name' => 'User',
					'foreign_key' => 'userId'),
			'Photo' => array(
					'mapping_type' => HAS_MANY,
					'class_name' => 'Photo',
					'foreign_key' => 'cardId'),
			'Feedback' => array (
					'mapping_type' => HAS_MANY,
					'class_name' => 'Feedback',
					'foreign_key' => 'cardId'));*/
	
	public function findCardsByUserId($userId) {
		$condition = array('userId' => $userId);
		return $this->where($condition)->select();
	}
}