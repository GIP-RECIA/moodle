<?php

class com_wiris_quizzes_Question extends com_wiris_quizzes_Serializable {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $id;
	public $wirisCasSession;
	public $correctAnswers;
	public $assertions;
	public $options;
	public $localData;
	public function onSerialize($s) {
		$s->beginTag(com_wiris_quizzes_Question::$tagName);
		$this->id = $s->attributeString("id", $this->id, null);
		$this->wirisCasSession = $s->childString("wirisCasSession", $this->wirisCasSession, null);
		$this->correctAnswers = $s->serializeArrayName($this->correctAnswers, "correctAnswers");
		$this->assertions = $s->serializeArrayName($this->assertions, "assertions");
		$this->options = $s->serializeArrayName($this->options, "options");
		$this->localData = $s->serializeArrayName($this->localData, "localData");
		$s->endTag();
	}
	public function newInstance() {
		return new com_wiris_quizzes_Question();
	}
	public function setAssertion($name, $correctAnswer, $userAnswer) {
		$this->setParametrizedAssertion($name, $correctAnswer, $userAnswer, null);
	}
	public function removeAssertion($name, $correctAnswer, $userAnswer) {
		if($this->assertions !== null) {
			$i = $this->assertions->length - 1;
			while($i >= 0) {
				$a = $this->assertions[$i];
				if($a->name === $name && $a->correctAnswer === $correctAnswer && $a->answer === $userAnswer) {
					$this->assertions->remove($a);
				}
				$i--;
				unset($a);
			}
		}
	}
	public function setParametrizedAssertion($name, $correctAnswer, $userAnswer, $parameters) {
		if($this->assertions === null) {
			$this->assertions = new _hx_array(array());
		}
		$a = new com_wiris_quizzes_Assertion();
		$a->name = $name;
		$a->correctAnswer = $correctAnswer;
		$a->answer = $userAnswer;
		$names = com_wiris_quizzes_Assertion::getParameterNames($name);
		if($parameters !== null && $names !== null) {
			$a->parameters = new _hx_array(array());
			$n = com_wiris_quizzes_Question_0($this, $a, $correctAnswer, $name, $names, $parameters, $userAnswer);
			$i = null;
			{
				$_g = 0;
				while($_g < $n) {
					$i1 = $_g++;
					$ap = new com_wiris_quizzes_AssertionParam();
					$ap->name = $names[$i1];
					$ap->content = $parameters[$i1];
					$ap->type = com_wiris_quizzes_MathContent::$TYPE_TEXT;
					$a->parameters->push($ap);
					unset($i1,$ap);
				}
			}
		}
		$index = $this->getAssertionIndex($name, $correctAnswer, $userAnswer);
		if($index === -1) {
			$this->assertions->push($a);
		} else {
			$this->assertions[$index] = $a;
		}
	}
	public function setOption($name, $value) {
		if($this->options === null) {
			$this->options = new _hx_array(array());
		}
		$opt = new com_wiris_quizzes_Option();
		$opt->name = $name;
		$opt->content = $value;
		$opt->type = com_wiris_quizzes_MathContent::$TYPE_TEXT;
		$i = null;
		$found = false;
		{
			$_g1 = 0; $_g = $this->options->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				if(_hx_array_get($this->options, $i1)->name === $name) {
					$this->options[$i1] = $opt;
					$found = true;
				}
				unset($i1);
			}
		}
		if(!$found) {
			$this->options->push($opt);
		}
	}
	public function getOption($name) {
		if($this->options !== null) {
			$i = null;
			{
				$_g1 = 0; $_g = $this->options->length;
				while($_g1 < $_g) {
					$i1 = $_g1++;
					if(_hx_array_get($this->options, $i1)->name === $name) {
						return _hx_array_get($this->options, $i1)->content;
					}
					unset($i1);
				}
			}
		}
		return $this->defaultOption($name);
	}
	public function removeOption($name) {
		if($this->options !== null) {
			$i = null;
			{
				$_g1 = 0; $_g = $this->options->length;
				while($_g1 < $_g) {
					$i1 = $_g1++;
					if(_hx_array_get($this->options, $i1)->name === $name) {
						$this->options->remove($this->options[$i1]);
					}
					unset($i1);
				}
			}
		}
	}
	public function removeLocalData($name) {
		if($this->localData !== null) {
			$i = null;
			{
				$_g1 = 0; $_g = $this->localData->length;
				while($_g1 < $_g) {
					$i1 = $_g1++;
					if(_hx_array_get($this->localData, $i1)->name === $name) {
						$this->localData->remove($this->localData[$i1]);
					}
					unset($i1);
				}
			}
		}
	}
	public function defaultOption($name) {
		if($name === com_wiris_quizzes_Option::$OPTION_EXPONENTIAL_E) {
			return "e";
		} else {
			if($name === com_wiris_quizzes_Option::$OPTION_IMAGINARY_UNIT) {
				return "i";
			} else {
				if($name === com_wiris_quizzes_Option::$OPTION_IMPLICIT_TIMES_OPERATOR) {
					return "false";
				} else {
					if($name === com_wiris_quizzes_Option::$OPTION_NUMBER_PI) {
						return php_Utf8::uchr(960);
					} else {
						if($name === com_wiris_quizzes_Option::$OPTION_PRECISION) {
							return "4";
						} else {
							if($name === com_wiris_quizzes_Option::$OPTION_RELATIVE_TOLERANCE) {
								return "false";
							} else {
								if($name === com_wiris_quizzes_Option::$OPTION_TIMES_OPERATOR) {
									return php_Utf8::uchr(183);
								} else {
									if($name === com_wiris_quizzes_Option::$OPTION_TOLERANCE) {
										return "10^(-4)";
									} else {
										return null;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	public function setCorrectAnswer($index, $content) {
		if($index < 0) {
			throw new HException("Invalid index: " . $index);
		}
		if($this->correctAnswers === null) {
			$this->correctAnswers = new _hx_array(array());
		}
		while($index >= $this->correctAnswers->length) {
			$this->correctAnswers->push(new com_wiris_quizzes_CorrectAnswer());
		}
		$ca = $this->correctAnswers[$index];
		$ca->id = $index;
		$ca->weight = 1.0;
		$ca->set($content);
	}
	public function getAssertionIndex($name, $correctAnswer, $userAnswer) {
		if($this->assertions === null) {
			return -1;
		}
		$i = null;
		{
			$_g1 = 0; $_g = $this->assertions->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$a = $this->assertions[$i1];
				if($a->correctAnswer === $correctAnswer && $a->answer === $userAnswer && $a->name === $name) {
					return $i1;
				}
				unset($i1,$a);
			}
		}
		return -1;
	}
	public function setLocalData($name, $value) {
		if($this->localData === null) {
			$this->localData = new _hx_array(array());
		}
		$data = new com_wiris_quizzes_LocalData();
		$data->name = $name;
		$data->value = $value;
		$i = null;
		$found = false;
		{
			$_g1 = 0; $_g = $this->localData->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				if(_hx_array_get($this->localData, $i1)->name === $name) {
					$this->localData[$i1] = $data;
					$found = true;
				}
				unset($i1);
			}
		}
		if(!$found) {
			$this->localData->push($data);
		}
	}
	public function getLocalData($name) {
		if($this->localData !== null) {
			$i = null;
			{
				$_g1 = 0; $_g = $this->localData->length;
				while($_g1 < $_g) {
					$i1 = $_g1++;
					if(_hx_array_get($this->localData, $i1)->name === $name) {
						return _hx_array_get($this->localData, $i1)->value;
					}
					unset($i1);
				}
			}
		}
		return $this->defaultLocalData($name);
	}
	public function defaultLocalData($name) {
		if($name === com_wiris_quizzes_LocalData::$KEY_OPENANSWER_COMPOUND_ANSWER) {
			return com_wiris_quizzes_LocalData::$VALUE_OPENANSWER_COMPOUND_ANSWER_FALSE;
		} else {
			if($name === com_wiris_quizzes_LocalData::$KEY_OPENANSWER_INPUT_FIELD) {
				return com_wiris_quizzes_LocalData::$VALUE_OPENANSWER_INPUT_FIELD_INLINE_EDITOR;
			} else {
				if($name === com_wiris_quizzes_LocalData::$KEY_SHOW_CAS) {
					return com_wiris_quizzes_LocalData::$VALUE_SHOW_CAS_FALSE;
				} else {
					if($name === com_wiris_quizzes_LocalData::$KEY_CAS_INITIAL_SESSION) {
						return null;
					} else {
						return null;
					}
				}
			}
		}
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
	static $tagName = "question";
	function __toString() { return 'com.wiris.quizzes.Question'; }
}
function com_wiris_quizzes_Question_0(&$»this, &$a, &$correctAnswer, &$name, &$names, &$parameters, &$userAnswer) {
	if($parameters->length < $names->length) {
		return $parameters->length;
	} else {
		return $names->length;
	}
}
