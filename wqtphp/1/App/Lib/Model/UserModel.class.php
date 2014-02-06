<?php
	class UserModel extends Model {
		protected $trueTableName = 'tbl_user';
		
		protected $fields = array('userId', 'userName', 'userPwd', 'priviledge', 'createDate',
				'_pk' => 'userId', '_autoinc' => true);
		
		/*protected $_link = array(
				'WeddingCard' => array (
						'mapping_type' => HAS_MANY,
						'class_name' => 'WeddingCard',
						'foreign_key' => 'userId'));*/
		
		protected $_map = array(
				'username' => 'userName',
				'password' => 'userPwd'
		);
		
		public function findByUserName($userName) {
			if (is_empty_string($userName)) return null;

			$condition = array('userName' => $userName);
			return $this->where($condition)->find();
		}
	}