<?php

class com_wiris_quizzes_HTMLGuiConfig {
	public function __construct($classes) {
		if(!php_Boot::$skip_constructor) {
		$this->configClasses = new _hx_array(array());
		$this->openAnswerConfig();
		if($classes === null) {
			$classes = "";
		}
		$classArray = _hx_explode(" ", $classes);
		$i = null;
		{
			$_g1 = 0; $_g = $classArray->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$className = $classArray[$i1];
				if($className === com_wiris_quizzes_HTMLGuiConfig::$WIRISMULTICHOICE) {
					$this->multiChoiceConfig();
					$this->configClasses->push(com_wiris_quizzes_HTMLGuiConfig::$WIRISMULTICHOICE);
				} else {
					if($className === com_wiris_quizzes_HTMLGuiConfig::$WIRISOPENANSWER) {
						$this->openAnswerConfig();
						$this->configClasses->push(com_wiris_quizzes_HTMLGuiConfig::$WIRISOPENANSWER);
					}
				}
				unset($i1,$className);
			}
		}
	}}
	public $tabCorrectAnswer;
	public $tabValidation;
	public $tabVariables;
	public $tabPreview;
	public $configClasses;
	public function openAnswerConfig() {
		$this->tabCorrectAnswer = true;
		$this->tabValidation = true;
		$this->tabVariables = true;
		$this->tabPreview = true;
	}
	public function multiChoiceConfig() {
		$this->tabCorrectAnswer = false;
		$this->tabValidation = false;
		$this->tabVariables = true;
		$this->tabPreview = false;
	}
	public function getClasses() {
		$sb = new StringBuf();
		$i = null;
		{
			$_g1 = 0; $_g = $this->configClasses->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				if($i1 > 0) {
					$x = " ";
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
					$x = $this->configClasses[$i1];
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
		return $sb->b;
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
	static $WIRISMULTICHOICE = "wirismultichoice";
	static $WIRISOPENANSWER = "wirisopenanswer";
	function __toString() { return 'com.wiris.quizzes.HTMLGuiConfig'; }
}
