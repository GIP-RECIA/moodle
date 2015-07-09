<?php

class com_wiris_quizzes_ProcessGetCheckAssertions extends com_wiris_quizzes_Process {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function onSerialize($s) {
		$s->beginTag(com_wiris_quizzes_ProcessGetCheckAssertions::$tagName);
		$s->endTag();
	}
	public function newInstance() {
		return new com_wiris_quizzes_ProcessGetCheckAssertions();
	}
	static $tagName = "getCheckAssertions";
	function __toString() { return 'com.wiris.quizzes.ProcessGetCheckAssertions'; }
}
