<?php

class com_wiris_quizzes_Assertion extends com_wiris_quizzes_Serializable {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $name;
	public $correctAnswer;
	public $answer;
	public $parameters;
	public function onSerialize($s) {
		$s->beginTag(com_wiris_quizzes_Assertion::$tagName);
		$this->name = $s->attributeString("name", $this->name, null);
		$this->correctAnswer = $s->attributeInt("correctAnswer", $this->correctAnswer, 0);
		$this->answer = $s->attributeInt("answer", $this->answer, 0);
		$this->parameters = $s->serializeArray($this->parameters, null);
		$s->endTag();
	}
	public function newInstance() {
		return new com_wiris_quizzes_Assertion();
	}
	public function setParam($name, $value) {
		if($this->parameters === null) {
			$this->parameters = new _hx_array(array());
		}
		if($this->isDefaultParameterValue($name, $value)) {
			$j = null;
			{
				$_g1 = 0; $_g = $this->parameters->length;
				while($_g1 < $_g) {
					$j1 = $_g1++;
					if(_hx_array_get($this->parameters, $j1)->name === $name) {
						$this->parameters->remove($this->parameters[$j1]);
					}
					unset($j1);
				}
			}
		} else {
			$found = false;
			$i = null;
			{
				$_g1 = 0; $_g = $this->parameters->length;
				while($_g1 < $_g) {
					$i1 = $_g1++;
					$p = $this->parameters[$i1];
					if($p->name === $name) {
						$p->content = $value;
						$found = true;
					}
					unset($p,$i1);
				}
			}
			if(!$found) {
				$q = new com_wiris_quizzes_AssertionParam();
				$q->name = $name;
				$q->content = $value;
				$q->type = com_wiris_quizzes_MathContent::$TYPE_TEXT;
				$this->parameters->push($q);
			}
		}
	}
	public function getParam($name) {
		if($this->parameters !== null) {
			$i = null;
			{
				$_g1 = 0; $_g = $this->parameters->length;
				while($_g1 < $_g) {
					$i1 = $_g1++;
					if(_hx_array_get($this->parameters, $i1)->name === $name) {
						return _hx_array_get($this->parameters, $i1)->content;
					}
					unset($i1);
				}
			}
		}
		if(com_wiris_quizzes_Assertion::$paramdefault === null) {
			com_wiris_quizzes_Assertion::initParams();
		}
		if(com_wiris_quizzes_Assertion::$paramdefault->exists($this->name)) {
			$values = com_wiris_quizzes_Assertion::$paramdefault->get($this->name);
			if($values->exists($name)) {
				return $values->get($name);
			}
		}
		return null;
	}
	public function isDefaultParameterValue($name, $value) {
		$defValue = com_wiris_quizzes_Assertion::getParameterDefaultValue($this->name, $name);
		return $this->equalLists($defValue, $value);
	}
	public function equalLists($a, $b) {
		$aa = _hx_explode(",", $a);
		$bb = _hx_explode(",", $b);
		if($aa->length !== $bb->length) {
			return false;
		}
		$i = null;
		{
			$_g1 = 0; $_g = $aa->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				if(!$this->inArray($aa[$i1], $bb)) {
					return false;
				}
				unset($i1);
			}
		}
		return true;
	}
	public function inArray($e, $a) {
		$i = null;
		{
			$_g1 = 0; $_g = $a->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				if($e === $a[$i1]) {
					return true;
				}
				unset($i1);
			}
		}
		return false;
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
	static $tagName = "assertion";
	static $SYNTAX_EXPRESSION = "syntax_expression";
	static $SYNTAX_QUANTITY = "syntax_quantity";
	static $SYNTAX_LIST = "syntax_list";
	static $EQUIVALENT_SYMBOLIC = "equivalent_symbolic";
	static $EQUIVALENT_LITERAL = "equivalent_literal";
	static $EQUIVALENT_SET = "equivalent_set";
	static $EQUIVALENT_FUNCTION = "equivalent_function";
	static $CHECK_INTEGER_FORM = "check_integer_form";
	static $CHECK_FRACTION_FORM = "check_fraction_form";
	static $CHECK_POLYNOMIAL_FORM = "check_polynomial_form";
	static $CHECK_RATIONAL_FUNCTION_FORM = "check_rational_function_form";
	static $CHECK_ELEMENTAL_FUNCTION_FORM = "check_elemental_function_form";
	static $CHECK_SCIENTIFIC_NOTATION = "check_scientific_notation";
	static $CHECK_SIMPLIFIED = "check_simplified";
	static $CHECK_EXPANDED = "check_expanded";
	static $CHECK_FACTORIZED = "check_factorized";
	static $CHECK_NO_COMMON_FACTOR = "check_no_common_factor";
	static $CHECK_DIVISIBLE = "check_divisible";
	static $CHECK_COMMON_DENOMINATOR = "check_common_denominator";
	static $CHECK_UNIT = "check_unit";
	static $CHECK_UNIT_LITERAL = "check_unit_literal";
	static $CHECK_NO_MORE_DECIMALS = "check_no_more_decimals";
	static $CHECK_NO_MORE_DIGITS = "check_no_more_digits";
	static $syntactic;
	static $equivalent;
	static $structure;
	static $checks;
	static $paramdefault;
	static $paramnames;
	static function initParams() {
		com_wiris_quizzes_Assertion::$paramnames = new Hash();
		com_wiris_quizzes_Assertion::$paramnames->set("syntax_expression", new _hx_array(array("constants", "functions")));
		com_wiris_quizzes_Assertion::$paramnames->set("syntax_list", new _hx_array(array("constants", "functions")));
		com_wiris_quizzes_Assertion::$paramnames->set("syntax_quantity", new _hx_array(array("constants", "units", "unitprefixes", "mixedfractions")));
		com_wiris_quizzes_Assertion::$paramnames->set("check_divisible", new _hx_array(array("value")));
		com_wiris_quizzes_Assertion::$paramnames->set("check_unit", new _hx_array(array("unit")));
		com_wiris_quizzes_Assertion::$paramnames->set("check_unit_literal", new _hx_array(array("unit")));
		com_wiris_quizzes_Assertion::$paramnames->set("check_no_more_decimals", new _hx_array(array("digits")));
		com_wiris_quizzes_Assertion::$paramnames->set("check_no_more_digits", new _hx_array(array("digits")));
		com_wiris_quizzes_Assertion::$paramnames->set("equivalent_function", new _hx_array(array("name")));
		$paramvalues = null;
		com_wiris_quizzes_Assertion::$paramdefault = new Hash();
		$constants = php_Utf8::uchr(960) . ", e, i, j";
		$functions = "exp, log, ln, sin, cos, tan, asin, acos, atan, cosec, sec, cotan, acosec, asec, acotan, sinh, cosh, tanh, asinh, acosh, atanh, min, max, sign";
		$paramvalues = new Hash();
		$paramvalues->set("constants", $constants);
		$paramvalues->set("functions", $functions);
		com_wiris_quizzes_Assertion::$paramdefault->set("syntax_expression", $paramvalues);
		$paramvalues = new Hash();
		$paramvalues->set("constants", $constants);
		$paramvalues->set("functions", $functions);
		com_wiris_quizzes_Assertion::$paramdefault->set("syntax_list", $paramvalues);
		$paramvalues = new Hash();
		$paramvalues->set("constants", $constants);
		$paramvalues->set("units", "sr, m, g, s, E, K, mol, cd, rad, h, min, l, N, Pa, Hz, W,J, C, V, " . php_Utf8::uchr(937) . ", F, S, Wb, b, H, T, lx, lm, Gy, Bq, Sv, kat");
		$paramvalues->set("unitprefixes", "y, z, a, f, p, n, " . php_Utf8::uchr(181) . ", m, c, d, da, h, k, M, G, T, P, E, Z, Y");
		$paramvalues->set("mixedfractions", "false");
		com_wiris_quizzes_Assertion::$paramdefault->set("syntax_quantity", $paramvalues);
		$paramvalues = new Hash();
		$paramvalues->set("value", "");
		com_wiris_quizzes_Assertion::$paramdefault->set("check_divisible", $paramvalues);
		$paramvalues = new Hash();
		$paramvalues->set("unit", "");
		com_wiris_quizzes_Assertion::$paramdefault->set("check_unit", $paramvalues);
		$paramvalues = new Hash();
		$paramvalues->set("unit", "");
		com_wiris_quizzes_Assertion::$paramdefault->set("check_unit_literal", $paramvalues);
		$paramvalues = new Hash();
		$paramvalues->set("digits", "");
		com_wiris_quizzes_Assertion::$paramdefault->set("check_no_more_decimals", $paramvalues);
		$paramvalues = new Hash();
		$paramvalues->set("digits", "");
		com_wiris_quizzes_Assertion::$paramdefault->set("check_no_more_digits", $paramvalues);
		$paramvalues = new Hash();
		$paramvalues->set("name", "");
		com_wiris_quizzes_Assertion::$paramdefault->set("equivalent_function", $paramvalues);
	}
	static function getParameterNames($name) {
		if(com_wiris_quizzes_Assertion::$paramnames === null) {
			com_wiris_quizzes_Assertion::initParams();
		}
		return com_wiris_quizzes_Assertion::$paramnames->get($name);
	}
	static function getParameterDefaultValue($assertion, $parameter) {
		$value = null;
		if(com_wiris_quizzes_Assertion::$paramdefault === null) {
			com_wiris_quizzes_Assertion::initParams();
		}
		if(com_wiris_quizzes_Assertion::$paramdefault->exists($assertion) && com_wiris_quizzes_Assertion::$paramdefault->get($assertion)->exists($parameter)) {
			$value = com_wiris_quizzes_Assertion::$paramdefault->get($assertion)->get($parameter);
		} else {
			$value = "";
		}
		return $value;
	}
	function __toString() { return 'com.wiris.quizzes.Assertion'; }
}
com_wiris_quizzes_Assertion::$syntactic = new _hx_array(array(com_wiris_quizzes_Assertion::$SYNTAX_EXPRESSION, com_wiris_quizzes_Assertion::$SYNTAX_QUANTITY, com_wiris_quizzes_Assertion::$SYNTAX_LIST));
com_wiris_quizzes_Assertion::$equivalent = new _hx_array(array(com_wiris_quizzes_Assertion::$EQUIVALENT_SYMBOLIC, com_wiris_quizzes_Assertion::$EQUIVALENT_LITERAL, com_wiris_quizzes_Assertion::$EQUIVALENT_SET, com_wiris_quizzes_Assertion::$EQUIVALENT_FUNCTION));
com_wiris_quizzes_Assertion::$structure = new _hx_array(array(com_wiris_quizzes_Assertion::$CHECK_INTEGER_FORM, com_wiris_quizzes_Assertion::$CHECK_FRACTION_FORM, com_wiris_quizzes_Assertion::$CHECK_POLYNOMIAL_FORM, com_wiris_quizzes_Assertion::$CHECK_RATIONAL_FUNCTION_FORM, com_wiris_quizzes_Assertion::$CHECK_ELEMENTAL_FUNCTION_FORM, com_wiris_quizzes_Assertion::$CHECK_SCIENTIFIC_NOTATION));
com_wiris_quizzes_Assertion::$checks = new _hx_array(array(com_wiris_quizzes_Assertion::$CHECK_SIMPLIFIED, com_wiris_quizzes_Assertion::$CHECK_EXPANDED, com_wiris_quizzes_Assertion::$CHECK_FACTORIZED, com_wiris_quizzes_Assertion::$CHECK_NO_COMMON_FACTOR, com_wiris_quizzes_Assertion::$CHECK_DIVISIBLE, com_wiris_quizzes_Assertion::$CHECK_COMMON_DENOMINATOR, com_wiris_quizzes_Assertion::$CHECK_UNIT, com_wiris_quizzes_Assertion::$CHECK_UNIT_LITERAL, com_wiris_quizzes_Assertion::$CHECK_NO_MORE_DECIMALS, com_wiris_quizzes_Assertion::$CHECK_NO_MORE_DIGITS));
