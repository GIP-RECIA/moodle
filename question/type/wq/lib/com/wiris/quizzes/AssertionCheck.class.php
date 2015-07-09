<?php

class com_wiris_quizzes_AssertionCheck extends com_wiris_quizzes_Serializable {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $value;
	public $assertion;
	public $answer;
	public $correctAnswer;
	public function onSerialize($s) {
		$s->beginTag(com_wiris_quizzes_AssertionCheck::$tagName);
		$this->assertion = $s->attributeString("assertion", $this->assertion, null);
		$this->answer = $s->attributeInt("answer", $this->answer, 0);
		$this->correctAnswer = $s->attributeInt("correctAnswer", $this->correctAnswer, 0);
		$this->value = $s->booleanContent($this->value);
		$s->endTag();
	}
	public function newInstance() {
		return new com_wiris_quizzes_AssertionCheck();
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
	static $tagName = "check";
	function __toString() { return 'com.wiris.quizzes.AssertionCheck'; }
}
