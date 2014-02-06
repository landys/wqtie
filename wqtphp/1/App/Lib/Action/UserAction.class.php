<?php

class UserAction extends Action {
	
	public function login() {
		$this->display();
	}
	
	public function submit_login() {
		$userName = $this->_param('username');
		$password = $this->_param('password');
		
		if (!is_empty_string($userName)) {
			$User = D('User');
			$user = $User->findByUserName($userName);
			if (count($user) > 0) {
				// put the user to the session
				session('user', $user);
				$this->redirect('manage/home');
				return;
			}
		}
		
		$this->display('login');
	}
	
	protected function _initialize() {
		header('Content-Type:text/html; charset=utf-8');
	}
	
	public function logout() {
		session('user', null);
		$this->redirect('login');
	}
}
