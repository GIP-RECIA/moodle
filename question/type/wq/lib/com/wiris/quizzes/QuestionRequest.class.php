<?php

class com_wiris_quizzes_QuestionRequest extends com_wiris_quizzes_Serializable {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $question;
	public $userData;
	public $processes;
	public function onSerialize($s) {
		$s->beginTag(com_wiris_quizzes_QuestionRequest::$tagName);
		$this->question = $s->serializeChildName($this->question, com_wiris_quizzes_Question::$tagName);
		$this->userData = $s->serializeChildName($this->userData, com_wiris_quizzes_UserData::$tagName);
		$this->processes = $s->serializeArrayName($this->processes, "processes");
		$s->endTag();
	}
	public function newInstance() {
		return new com_wiris_quizzes_QuestionRequest();
	}
	public function checkAssertions() {
		$p = new com_wiris_quizzes_ProcessGetCheckAssertions();
		$this->addProcess($p);
	}
	public function variables($names, $type) {
		$p = new com_wiris_quizzes_ProcessGetVariables();
		$sb = new StringBuf();
		$i = null;
		{
			$_g1 = 0; $_g = $names->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				if($i1 !== 0) {
					$x = ",";
					if(is_null($x)) {
						$x = "null";
					} else {
						if(is_bool($x)) {
							$x = (($x) ? "true" : "false");
						}
					}
					$sb->b .= $x;
					unset($x);
				}
				{
					$x = $names[$i1];
					if(is_null($x)) {
						$x = "null";
					} else {
						if(is_bool($x)) {
							$x = (($x) ? "true" : "false");
						}
					}
					$sb->b .= $x;
					unset($x);
				}
				unset($i1);
			}
		}
		$p->names = $sb->b;
		$p->type = $type;
		$this->addProcess($p);
	}
	public function addProcess($p) {
		if($this->processes === null) {
			$this->processes = new _hx_array(array());
		}
		$this->processes->push($p);
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
	static $tagName = "processQuestion";
	function __toString() { return 'com.wiris.quizzes.QuestionRequest'; }
}
