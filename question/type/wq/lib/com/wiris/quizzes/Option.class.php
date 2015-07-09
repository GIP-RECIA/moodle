<?php

class com_wiris_quizzes_Option extends com_wiris_quizzes_MathContent {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $name;
	public function newInstance() {
		return new com_wiris_quizzes_Option();
	}
	public function onSerialize($s) {
		$s->beginTag("option");
		$this->name = $s->attributeString("name", $this->name, null);
		parent::onSerializeInner($s);
		$s->endTag();
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
	static $OPTION_RELATIVE_TOLERANCE = "relative_tolerance";
	static $OPTION_TOLERANCE = "tolerance";
	static $OPTION_PRECISION = "precision";
	static $OPTION_TIMES_OPERATOR = "times_operator";
	static $OPTION_IMAGINARY_UNIT = "imaginary_unit";
	static $OPTION_EXPONENTIAL_E = "exponential_e";
	static $OPTION_NUMBER_PI = "number_pi";
	static $OPTION_IMPLICIT_TIMES_OPERATOR = "implicit_times_operator";
	function __toString() { return 'com.wiris.quizzes.Option'; }
}
