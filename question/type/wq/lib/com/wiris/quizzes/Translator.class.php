<?php

class com_wiris_quizzes_Translator {
	public function __construct($lang, $source) {
		if(!php_Boot::$skip_constructor) {
		$this->lang = $lang;
		$this->strings = new Hash();
		$i = null;
		{
			$_g1 = 0; $_g = $source->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$this->strings->set($source[$i1][0], $source[$i1][1]);
				unset($i1);
			}
		}
	}}
	public $strings;
	public $lang;
	public function t($code) {
		if($this->strings->exists($code)) {
			$code = $this->strings->get($code);
		} else {
			if(!("en" === $this->lang)) {
				$code = com_wiris_quizzes_Translator::getInstance("en")->t($code);
			}
		}
		return $code;
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
	static $languages;
	static function getInstance($lang) {
		if(com_wiris_quizzes_Translator::$languages === null) {
			com_wiris_quizzes_Translator::$languages = new Hash();
		}
		if(!com_wiris_quizzes_Translator::$languages->exists($lang)) {
			$source = null;
			if("es" === $lang) {
				$source = com_wiris_quizzes_Translator::$ES;
			} else {
				if("en" === $lang) {
					$source = com_wiris_quizzes_Translator::$EN;
				} else {
					$source = new _hx_array(array());
				}
			}
			$translator = new com_wiris_quizzes_Translator($lang, $source);
			com_wiris_quizzes_Translator::$languages->set($lang, $translator);
		}
		return com_wiris_quizzes_Translator::$languages->get($lang);
	}
	static $ES;
	static $EN;
	function __toString() { return 'com.wiris.quizzes.Translator'; }
}
com_wiris_quizzes_Translator::$ES = new _hx_array(array());
com_wiris_quizzes_Translator::$EN = new _hx_array(array(new _hx_array(array("comparison", "Comparison")), new _hx_array(array("properties", "Properties")), new _hx_array(array("hasalgorithm", "Has algorithm")), new _hx_array(array("comparisonwithstudentanswer", "Comparison with student answer")), new _hx_array(array("otheracceptedanswers", "Other accepted answers")), new _hx_array(array("equivalent_literal", "Literally equal")), new _hx_array(array("equivalent_literal_correct_feedback", "The answer is equal to the correct one.")), new _hx_array(array("equivalent_literal_incorrect_feedback", "The answer is not literally equal to the correct one.")), new _hx_array(array("equivalent_symbolic", "Mathematically equal")), new _hx_array(array("equivalent_symbolic_correct_feedback", "The answer is mathematically equal to the correct one.")), new _hx_array(array("equivalent_symbolic_incorrect_feedback", "The answer is not equivalent to the correct one.")), new _hx_array(array("equivalent_set", "Equal as sets")), new _hx_array(array("equivalent_set_correct_feedback", "The answer set is equal to the correct one.")), new _hx_array(array("equivalent_set_incorrect_feedback", "The answer set is not equivalent to the correct one.")), new _hx_array(array("equivalent_function", "Grading function")), new _hx_array(array("equivalent_function_correct_feedback", "The answer is correct.")), new _hx_array(array("any", "any")), new _hx_array(array("additionalproperties", "Additional properties")), new _hx_array(array("structure:", "Structure:")), new _hx_array(array("none", "none")), new _hx_array(array("check_integer_form", "has integer form")), new _hx_array(array("check_integer_form_correct_feedback", "The answer is an integer.")), new _hx_array(array("check_integer_form_incorrect_feedback", "The answer is not a single integer.")), new _hx_array(array("check_fraction_form", "has fraction form")), new _hx_array(array("check_fraction_form_correct_feedback", "The answer is a fraction.")), new _hx_array(array("check_fraction_form_incorrect_feedback", "The answer is not a fraction.")), new _hx_array(array("check_polynomial_form", "has polynomial form")), new _hx_array(array("check_polynomial_form_correct_feedback", "The answer is a polynomial.")), new _hx_array(array("check_polynomial_form_incorrect_feedback", "The answer is not a polynomial.")), new _hx_array(array("check_rational_function_form", "has rational function form")), new _hx_array(array("check_rational_function_form_correct_feedback", "The answer is a rational function.")), new _hx_array(array("check_rational_function_form_incorrect_feedback", "The answer is not a rational function.")), new _hx_array(array("check_elemental_function_form", "is a combination of elemental functions")), new _hx_array(array("check_elemental_function_form_correct_feedback", "The answer is an elemental expression.")), new _hx_array(array("check_elemental_function_form_incorrect_feedback", "The answer contains some non elemental function.")), new _hx_array(array("check_scientific_notation", "is in scientific notation")), new _hx_array(array("check_scientific_notation_correct_feedback", "The answer is expressed in scientific notation.")), new _hx_array(array("check_scientific_notation_incorrect_feedback", "The answer is not in standard scientific notation.")), new _hx_array(array("more:", "More:")), new _hx_array(array("check_simplified", "is simplified")), new _hx_array(array("check_simplified_correct_feedback", "The answer is simplified.")), new _hx_array(array("check_simplified_incorrect_feedback", "The answer is not simplified.")), new _hx_array(array("check_expanded", "is expanded")), new _hx_array(array("check_expanded_correct_feedback", "The answer is expanded.")), new _hx_array(array("check_expanded_incorrect_feedback", "The answer is not expanded.")), new _hx_array(array("check_factorized", "is factorized")), new _hx_array(array("check_factorized_correct_feedback", "The answer is factorized.")), new _hx_array(array("check_factorized_incorrect_feedback", "The answer is not factorized.")), new _hx_array(array("check_no_common_factor", "doesn't have common factors")), new _hx_array(array("check_no_common_factor_correct_feedback", "The answer doesn't have common factors.")), new _hx_array(array("check_no_common_factor_incorrect_feedback", "The answer has a common factor.")), new _hx_array(array("check_divisible", "is divisible by")), new _hx_array(array("check_divisible_correct_feedback", "The answer is divisible by \${value}.")), new _hx_array(array("check_divisible_incorrect_feedback", "The answer is not divisible by \${value}.")), new _hx_array(array("check_common_denominator", "has a single common denominator")), new _hx_array(array("check_common_denominator_correct_feedback", "The answer has a single common denominator.")), new _hx_array(array("check_common_denominator_incorrect_feedback", "The answer has not a single common denominator.")), new _hx_array(array("check_unit", "has unit equal to")), new _hx_array(array("check_unit_correct_feedback", "The answer unit is \${unit}.")), new _hx_array(array("check_unit_incorrect_feedback", "The answer unit is not \${unit}.")), new _hx_array(array("check_unit_literal", "has unit literally equal to")), new _hx_array(array("check_unit_literal_correct_feedback", "The answer unit is \${unit}.")), new _hx_array(array("check_unit_literal_incorrect_feedback", "The answer unit is not literally \${unit}.")), new _hx_array(array("check_no_more_decimals", "has less or equal decimals than")), new _hx_array(array("check_no_more_decimals_correct_feedback", "The answer has \${digits} or less decimals.")), new _hx_array(array("check_no_more_decimals_incorrect_feedback", "The answer has more than \${digits} decimals.")), new _hx_array(array("check_no_more_digits", "has less or equal digits than")), new _hx_array(array("check_no_more_digits_correct_feedback", "The answer has \${digits} or less digits.")), new _hx_array(array("check_no_more_digits_incorrect_feedback", "The answer has more than \${digits} digits.")), new _hx_array(array("syntax_expression", "General")), new _hx_array(array("syntax_expression_description", "(formulas, expressions, equations, matrices...)")), new _hx_array(array("syntax_expression_correct_feedback", "The answer syntax is correct.")), new _hx_array(array("syntax_expression_incorrect_feedback", "The answer syntax is incorrect.")), new _hx_array(array("syntax_quantity", "Quantity")), new _hx_array(array("syntax_quantity_description", "(numbers, measure units, fractions, mixed fractions...)")), new _hx_array(array("syntax_quantity_correct_feedback", "The answer syntax is correct.")), new _hx_array(array("syntax_quantity_incorrect_feedback", "The answer syntax is incorrect.")), new _hx_array(array("syntax_list", "List")), new _hx_array(array("syntax_list_description", "(lists without comma separator or brackets)")), new _hx_array(array("syntax_list_correct_feedback", "The answer syntax is correct.")), new _hx_array(array("syntax_list_incorrect_feedback", "The answer syntax is incorrect.")), new _hx_array(array("none", "none")), new _hx_array(array("edit", "Edit")), new _hx_array(array("accept", "Accept")), new _hx_array(array("cancel", "Cancel")), new _hx_array(array("explog", "exp/log")), new _hx_array(array("trigonometric", "trigonometric")), new _hx_array(array("hyperbolic", "hyperbolic")), new _hx_array(array("arithmetic", "arithmetic")), new _hx_array(array("all", "all")), new _hx_array(array("tolerance", "Tolerance:")), new _hx_array(array("relative", "relative")), new _hx_array(array("precision", "Precision:")), new _hx_array(array("implicit_times_operator", "Invisible times:")), new _hx_array(array("times_operator", "Times operator:")), new _hx_array(array("imaginary_unit", "Imaginary unit:")), new _hx_array(array("mixedfractions", "Mixed fractions")), new _hx_array(array("constants", "Constants:")), new _hx_array(array("functions", "Functions:")), new _hx_array(array("userfunctions", "User functions:")), new _hx_array(array("units", "Units:")), new _hx_array(array("unitprefixes", "Unit prefixes:")), new _hx_array(array("syntaxparams", "Syntax options")), new _hx_array(array("syntaxparams_expression", "Options for general")), new _hx_array(array("syntaxparams_quantity", "Options for quantity")), new _hx_array(array("syntaxparams_list", "Options for list")), new _hx_array(array("allowedinput", "Allowed input")), new _hx_array(array("manual", "Manual")), new _hx_array(array("correctanswer", "Correct answer")), new _hx_array(array("variables", "Variables")), new _hx_array(array("validation", "Validation")), new _hx_array(array("preview", "Preview")), new _hx_array(array("correctanswertabhelp", "Please, input the correct answer. You will use the same input method as the student.\x0A" . "You will not be able to store the input until it is a valid formula.\x0A" . "Select also how do you want to use the formula editor to input the answer by the student")), new _hx_array(array("assertionstabhelp", "Select what kind of input is expected. For example, choose between general mathematical expressions or quantities that involve measure units.\x0A" . "Check how the correct answer is validated against the student answer.")), new _hx_array(array("variablestabhelp", "Type your algorism to generate random values for your variables with WIRIS CAS.\x0A" . "You can also select the format of the output values")), new _hx_array(array("testtabhelp", "Type the answer to simulate the possible response of a student.\x0A" . "You can also test the evaluation criteria, success and automatic feedback.")), new _hx_array(array("start", "Start")), new _hx_array(array("test", "Test")), new _hx_array(array("clicktesttoevaluate", "Click Test button to validate the current answer.")), new _hx_array(array("correct", "Correct!")), new _hx_array(array("incorrect", "Incorrect!")), new _hx_array(array("inputmethod", "Input method")), new _hx_array(array("compoundanswer", "Compound answer")), new _hx_array(array("answerinputinlineeditor", "WIRIS editor embedded")), new _hx_array(array("answerinputpopupeditor", "WIRIS editor in popup")), new _hx_array(array("answerinputplaintext", "Plain text input field")), new _hx_array(array("showauxiliarcas", "Include auxiliar WIRIS CAS")), new _hx_array(array("initialcascontent", "Initial content")), new _hx_array(array("tolerancedigits", "Tolerance digits:")), new _hx_array(array("algorithmlanguage", "Algorithm language:"))));
