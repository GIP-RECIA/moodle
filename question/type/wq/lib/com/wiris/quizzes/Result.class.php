<?php

class com_wiris_quizzes_Result extends com_wiris_quizzes_Serializable {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $errors;
	public function onSerialize($s) {
	}
	public function newInstance() {
		return new com_wiris_quizzes_Result();
	}
	public function onSerializeInner($s) {
		$this->errors = $s->serializeArray($this->errors, "error");
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
	function __toString() { return 'com.wiris.quizzes.Result'; }
}
