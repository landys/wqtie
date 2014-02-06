<?php

class CardAction extends Action {
	protected function _initialize() {
		header("Content-Type:text/html; charset=utf-8");
	}
	
	public function view() {
		$template = I(3);
		$cardId = I(4);
		if (!$template || !$cardId) return;
		$this->processViewCard($template, $cardId);
	}
	
	// t1, t2, t3, t4 is used for support previous card url version.
	// i.e. card/t1.html?cid=1
	public function t1() {
		$cardId = $this->_get('cid');
		if (!$cardId) return;
		
		$this->processViewCard(1, $cardId);
	}
	
	public function t2() {
		$cardId = $this->_get('cid');
		if (!$cardId) return;
		
		$this->processViewCard(2, $cardId);
	}
	
	public function t3() {
		$cardId = $this->_get('cid');
		if (!$cardId) return;
		
		$this->processViewCard(3, $cardId);
	}
	
	public function t4() {
		$cardId = $this->_get('cid');
		if (!$cardId) return;
		
		$this->processViewCard(4, $cardId);
	}
	
	private function processViewCard($template, $cardId) {
		// card
		$Card = D('WeddingCard');
		$card = $Card->find($cardId);
		
		$this->assign('card', $card);
		$this->assign('cardId', $cardId);
		
		// photo
		$Photo = D('Photo');
		$photos = $Photo->findPhotosByCardId($cardId);
		$this->assign('photos', $photos);
		$this->assign('nPhotos', count($photos));
		
		if (!is_empty_string($card['pageImageUrl'])) {
			$t2Bg = $card['pageImageUrl'];
		}
		else {
			$t2Bg = $card['pagePhotoUrl'];
		}
		$this->assign('t2Bg', $t2Bg);
		
		$this->assign('pageUrl', cur_page_url());
		
		$this->display('t'.$template);
	}
	
	public function add_feedback() {
		$cardId = I('cid');
		if (!$cardId) {
			$data['status'] = false;
			$data['message'] = 'No card id.';
		}
		else {
			$Feedback = D('Feedback');
			$Feedback->create();
			$Feedback->__set('cardId', $cardId);
			$Feedback->__set('createDate', date('Y-m-d H:i:s'));
			$Feedback->add();
			
			$data['status'] = true;
		}
		
		$this->ajaxReturn($data, 'JSON');
	}
}