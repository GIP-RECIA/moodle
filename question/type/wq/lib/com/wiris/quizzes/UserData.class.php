<?php

class com_wiris_quizzes_UserData extends com_wiris_quizzes_Serializable {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
		$this->randomSeed = -1;
	}}
	public $randomSeed;
	public $answers;
	public function onSerialize($s) {
		$s->beginTag(com_wiris_quizzes_UserData::$tagName);
		$this->randomSeed = $s->serializeIntName("randomSeed", $this->randomSeed, -1);
		$s->serializeArrayName($this->answers, "answers");
		$s->endTag();
	}
	public function newInstance() {
		return new com_wiris_quizzes_UserData();
	}
	public function setUserAnswer($index, $content) {
		if($index < 0) {
			throw new HException("Invalid index: " . $index);
		}
		if($this->answers === null) {
			$this->answers = new _hx_array(array());
		}
		while($this->answers->length <= $index) {
			$this->answers->push(new com_wiris_quizzes_Answer());
		}
		$a = $this->answers[$index];
		$a->id = $index;
		$a->set($content);
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
	static $tagName = "userData";
	function __toString() { return 'com.wiris.quizzes.UserData'; }
}
