<?php

class com_wiris_quizzes_MultipleQuestionResponse extends com_wiris_quizzes_Serializable {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $questionResponses;
	public function onSerialize($s) {
		$s->beginTag(com_wiris_quizzes_MultipleQuestionResponse::$tagName);
		$this->questionResponses = $s->serializeArray($this->questionResponses, null);
		$s->endTag();
	}
	public function newInstance() {
		return new com_wiris_quizzes_MultipleQuestionResponse();
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
	static $tagName = "processQuestionsResult";
	function __toString() { return 'com.wiris.quizzes.MultipleQuestionResponse'; }
}
