<?php

class com_wiris_quizzes_LocalData extends com_wiris_quizzes_Serializable {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $name;
	public $value;
	public function onSerialize($s) {
		$s->beginTag(com_wiris_quizzes_LocalData::$tagName);
		$this->name = $s->attributeString("name", $this->name, null);
		$this->value = $s->textContent($this->value);
		$s->endTag();
	}
	public function newInstance() {
		return new com_wiris_quizzes_LocalData();
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
	static $tagName = "data";
	static $KEY_OPENANSWER_COMPOUND_ANSWER = "inputCompound";
	static $KEY_OPENANSWER_INPUT_FIELD = "inputField";
	static $KEY_SHOW_CAS = "cas";
	static $KEY_CAS_INITIAL_SESSION = "casSession";
	static $VALUE_OPENANSWER_COMPOUND_ANSWER_TRUE = "true";
	static $VALUE_OPENANSWER_COMPOUND_ANSWER_FALSE = "false";
	static $VALUE_OPENANSWER_INPUT_FIELD_INLINE_EDITOR = "inlineEditor";
	static $VALUE_OPENANSWER_INPUT_FIELD_POPUP_EDITOR = "popupEditor";
	static $VALUE_OPENANSWER_INPUT_FIELD_PLAIN_TEXT = "textField";
	static $VALUE_SHOW_CAS_FALSE = "false";
	static $VALUE_SHOW_CAS_ADD = "add";
	static $VALUE_SHOW_CAS_REPLACE_INPUT = "replace";
	function __toString() { return 'com.wiris.quizzes.LocalData'; }
}
