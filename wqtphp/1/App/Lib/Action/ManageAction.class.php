<?php

class ManageAction extends Action {
	protected function _initialize() {
		header('Content-Type:text/html; charset=utf-8');
	}
	
	private function checkUser() {
		$user = session('user');
		if ($user == null)
		{
			$this->redirect('user/login');
			return null;
		}
		
		$this->assign('user', $user);
		return $user;
	}
	
	public function home() {
		// user
		$user = $this->checkUser();
		if (!$user) return;
		
		// card
		$Card = D('WeddingCard');
		$cards = $Card->findCardsByUserId($user['userId']);
		
		$this->assign('cards', $cards);
		$nCards = count($cards);
		$this->assign('nCards', $nCards);
		
		$this->display('home');
	}
	
	public function edit_card() {
		if (!$this->checkUser()) return;
		
		$cardId = I(2);
		
		$this->getAndSetCardInfo($cardId);
		
		$this->display('edit_card');
	}
	
	private function getAndSetCardInfo($cardId) {
		if ($cardId != null)
		{
			// card
			$Card = D('WeddingCard');
			$card = $Card->find($cardId);
				
			$this->assign('card', $card);
			$this->assign('cardId', $cardId);
				
			// photo
			$Photo = D('Photo');
			$photos = $Photo->findPhotosByCardId($cardId);
			$this->assign('photos', $photos);
		}
	}
	
	public function copy_card() {
		if (!$this->checkUser()) return;
		
		$cardId = I(2);
		if (!$cardId) return;
		
		$Card = D('WeddingCard');
		$card = $Card->find($cardId);
		if (!$card) return;
		
		$card['cardId'] = null;
		
		$Photo = D('Photo');
		$photos = $Photo->findPhotosByCardId($cardId);
		
		$cardId = $Card->add($card);
		
		$nPhotos = count($photos);
		if ($nPhotos > 0) {
			for ($i=0; $i<$nPhotos; ++$i) {
				$photo = $photos[$i];
				$photo['photoId'] = null;
				$photo['cardId'] = $cardId;
				$Photo->add($photo);
			}
		}
		
		$this->redirect('home');
	}
	
	public function submit_card() {
		$user = $this->checkUser();
		if (!$user) return;
		
		$cardId = I(2);
		
		$curDate = date('Y-m-d H:i:s');
		// card
		$Card = D('WeddingCard');
		$Card->create();
		$Card->__set('userId', $user['userId']);
		if (!is_empty_string($cardId)) {
			$Card->__set('cardId', $cardId);
			$Card->save();
		}
		else {
			// get card id for saving photos.
			$Card->__set('createDate', $curDate);
			$cardId = $Card->add();
		}
		
		// photo
		$Photo = D('Photo');
		$photos = $Photo->findPhotosByCardId($cardId);
		
		// get photo urls from web form
		$photoKeys = array('p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8');
		$pkCount = count($photoKeys);
		$t = 0;
		for ($i=0; $i<$pkCount; ++$i) {
			$photoUrl = I($photoKeys[$i]);
			if (!is_empty_string($photoUrl)) {
				$photoUrls[$t++] = $photoUrl;
			}
		}
		
		// update photo info
		$nPhotoInDb = count($photos);
		$nPhotoInput = count($photoUrls);
		for ($i=0; $i<$nPhotoInDb || $i<$nPhotoInput; ++$i) {
			if ($i<$nPhotoInDb && $i<$nPhotoInput) {
				// update photo
				$photo = $photos[$i];
				$photo['url'] = $photoUrls[$i];
				$Photo->save($photo);
			}
			else if ($i<$nPhotoInDb) {
				// delete photo
				$photo = $photos[$i];
				$Photo->deletePhoto($photo['photoId']);
			}
			else {
				// add photo
				$photo['url'] = $photoUrls[$i];
				$photo['cardId'] = $cardId;
				$photo['createDate'] = $curDate;
				$Photo->add($photo);
			}
		}
		
		$this->redirect('home');
	}
}