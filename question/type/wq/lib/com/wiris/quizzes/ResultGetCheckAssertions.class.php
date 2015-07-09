<?php

class com_wiris_quizzes_ResultGetCheckAssertions extends com_wiris_quizzes_Result {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $checks;
	public function onSerialize($s) {
		$s->beginTag(com_wiris_quizzes_ResultGetCheckAssertions::$tagName);
		$this->onSerializeInner($s);
		$this->checks = $s->serializeArray($this->checks, null);
		$s->endTag();
	}
	public function newInstance() {
		return new com_wiris_quizzes_ResultGetCheckAssertions();
	}
	public function __call($m, $a) {
		if(isset($this->$m) && is_callable($this->$m))
			return call_user_func_array($this->$m, $a);
		else if(isset($this->»dynamics[$m]) && is_callable($this->»dynamics[$m]))
			return call_user_func_array($this->»dynamics[$m], $a);
		else if('toString' == $m)
			return $this->__toString();
		else
			throw new HException('Unable to call «'.$m.'»');
	}
	static $tagName = "getCheckAssertionsResult";
	function __toString() { return 'com.wiris.quizzes.ResultGetCheckAssertions'; }
}
