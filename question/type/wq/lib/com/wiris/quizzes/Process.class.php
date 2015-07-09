<?php

class com_wiris_quizzes_Process extends com_wiris_quizzes_Serializable {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function onSerialize($s) {
	}
	public function newInstance() {
		return new com_wiris_quizzes_Process();
	}
	function __toString() { return 'com.wiris.quizzes.Process'; }
}
