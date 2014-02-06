<?php
	class FeedbackModel extends Model {
		protected $trueTableName = 'tbl_feedback';
		
		protected $fields = array('feedbackId', 'cardId', 'guestName', 'attendees', 'phone', 'wish', 'createDate',
				'_pk' => 'feedbackId', '_autoinc' => true);
		
		protected $_map = array(
				'guest' => 'guestName'
		);
		
		/*protected $_link = array(
				'WeddingCard' => array(
						'mapping_type' => BELONGS_TO,
						'class_name' => 'WeddingCard',
						'foreign_key' => 'cardId'));*/
	}