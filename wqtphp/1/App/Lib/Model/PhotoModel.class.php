<?php
	class PhotoModel extends Model {
		protected $trueTableName = 'tbl_photo';
		
		protected $fields = array('photoId', 'cardId', 'title', 'url', 'createDate',
				'_pk' => 'photoId', '_autoinc' => true);
		
		/*protected $_link = array(
				'WeddingCard' => array(
						'mapping_type' => BELONGS_TO,
						'class_name' => 'WeddingCard',
						'foreign_key' => 'cardId'));*/
		
		public function findPhotosByCardId($cardId) {
			$condition = array('cardId' => $cardId);
			return $this->where($condition)->select();
		}
		
		public function deletePhoto($photoId) {
			$condition = array('photoId' => $photoId);
			return $this->where($condition)->delete();
		}
	}