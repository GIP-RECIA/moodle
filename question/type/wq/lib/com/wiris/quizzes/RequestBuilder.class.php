<?php

class com_wiris_quizzes_RequestBuilder {
	public function __construct() {
		;
	}
	public $serializer;
	public function readQuestion($xml) {
		$s = $this->getSerializer();
		$elem = $s->read($xml);
		$tag = $s->getTagName($elem);
		if(!($tag === "question")) {
			throw new HException("Unexpected root tag " . $tag . ". Expected question.");
		}
		return $elem;
	}
	public function readQuestionInstance($xml) {
		$s = $this->getSerializer();
		$elem = $s->read($xml);
		$tag = $s->getTagName($elem);
		if(!($tag === "questionInstance")) {
			throw new HException("Unexpected root tag " . $tag . ". Expected questionInstance.");
		}
		return $elem;
	}
	public function newVariablesRequest($html, $q, $qi) {
		if($q === null) {
			throw new HException("Question q cannot be null.");
		}
		if($qi === null || $qi->userData === null) {
			$qi = new com_wiris_quizzes_QuestionInstance();
		}
		$qr = new com_wiris_quizzes_QuestionRequest();
		$qr->question = $q;
		$qr->userData = $qi->userData;
		$h = new com_wiris_quizzes_HTMLTools();
		$variables = $h->extractVariableNames($html);
		$qr->variables($variables, com_wiris_quizzes_MathContent::$TYPE_TEXT);
		$qr->variables($variables, com_wiris_quizzes_MathContent::$TYPE_MATHML);
		return $qr;
	}
	public function newEvalRequest($correctAnswer, $userAnswer, $q, $qi) {
		return $this->newEvalMultipleAnswersRequest(new _hx_array(array($correctAnswer)), new _hx_array(array($userAnswer)), $q, $qi);
	}
	public function newEvalMultipleAnswersRequest($correctAnswers, $userAnswers, $q, $qi) {
		$qq = new com_wiris_quizzes_Question();
		if($q !== null) {
			$qq->wirisCasSession = $q->wirisCasSession;
			$qq->options = $q->options;
		}
		$i = null; $j = null;
		$qq->assertions = new _hx_array(array());
		if($q !== null && $q->assertions !== null && $q->assertions->length > 0) {
			$_g1 = 0; $_g = $q->assertions->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$qq->assertions->push($q->assertions[$i1]);
				unset($i1);
			}
		}
		{
			$_g1 = 0; $_g = $correctAnswers->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$found = false;
				$k = null;
				{
					$_g3 = 0; $_g2 = $qq->assertions->length;
					while($_g3 < $_g2) {
						$k1 = $_g3++;
						if(_hx_array_get($qq->assertions, $k1)->correctAnswer === $i1) {
							$found = true;
							break;
						}
						unset($k1);
					}
					unset($_g3,$_g2);
				}
				if(!$found) {
					$j = Math::floor(1.0 * $i1 / $correctAnswers->length * $userAnswers->length);
					$qq->setAssertion(com_wiris_quizzes_Assertion::$SYNTAX_EXPRESSION, $i1, $j);
					$qq->setAssertion(com_wiris_quizzes_Assertion::$EQUIVALENT_SYMBOLIC, $i1, $j);
				}
				unset($k,$i1,$found);
			}
		}
		{
			$_g1 = 0; $_g = $correctAnswers->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$value = $correctAnswers[$i1];
				if($value === null) {
					$value = "";
				}
				if($qi !== null && $qi->hasVariables()) {
					$h = new com_wiris_quizzes_HTMLTools();
					$mathType = com_wiris_quizzes_MathContent::getMathType($value);
					$v = new Hash();
					$tv = $qi->variables->get($mathType);
					if($tv !== null) {
						$v->set($mathType, $tv);
						$value = $h->expandVariables($value, $v);
					}
					unset($v,$tv,$mathType,$h);
				}
				$qq->setCorrectAnswer($i1, $value);
				unset($value,$i1);
			}
		}
		$uu = new com_wiris_quizzes_UserData();
		if($qi !== null && $qi->userData !== null) {
			$uu->randomSeed = $qi->userData->randomSeed;
		} else {
			$qqi = new com_wiris_quizzes_QuestionInstance();
			$uu->randomSeed = $qqi->userData->randomSeed;
		}
		{
			$_g1 = 0; $_g = $userAnswers->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$answerValue = $userAnswers[$i1];
				if($answerValue === null) {
					$answerValue = "";
				}
				$uu->setUserAnswer($i1, $userAnswers[$i1]);
				unset($i1,$answerValue);
			}
		}
		$qr = new com_wiris_quizzes_QuestionRequest();
		$qr->question = $qq;
		$qr->userData = $uu;
		$qr->checkAssertions();
		return $qr;
	}
	public function newRequestFromXml($xml) {
		$s = $this->getSerializer();
		$elem = $s->read($xml);
		$req = null;
		$tag = $s->getTagName($elem);
		if($tag === com_wiris_quizzes_QuestionRequest::$tagName) {
			$req = $elem;
		} else {
			if($tag === com_wiris_quizzes_MultipleQuestionRequest::$tagName) {
				$mqr = $elem;
				$req = $mqr->questionRequests[0];
			} else {
				throw new HException("Unexpected XML root tag " . $tag . ".");
			}
		}
		return $req;
	}
	public function newResponseFromXml($xml) {
		$mqr = $this->newMultipleResponseFromXml($xml);
		return $mqr->questionResponses[0];
	}
	public function newMultipleResponseFromXml($xml) {
		$s = $this->getSerializer();
		$elem = $s->read($xml);
		$mqr = null;
		$tag = $s->getTagName($elem);
		if($tag === com_wiris_quizzes_QuestionResponse::$tagName) {
			$res = $elem;
			$mqr = new com_wiris_quizzes_MultipleQuestionResponse();
			$mqr->questionResponses = new _hx_array(array());
			$mqr->questionResponses->push($res);
		} else {
			if($tag === com_wiris_quizzes_MultipleQuestionResponse::$tagName) {
				$mqr = $elem;
			} else {
				throw new HException("Unexpected XML root tag " . $tag . ".");
			}
		}
		return $mqr;
	}
	public function getSerializer() {
		if($this->serializer === null) {
			$this->serializer = new com_wiris_quizzes_Serializer();
			$this->serializer->register(new com_wiris_quizzes_Answer());
			$this->serializer->register(new com_wiris_quizzes_Assertion());
			$this->serializer->register(new com_wiris_quizzes_AssertionCheck());
			$this->serializer->register(new com_wiris_quizzes_AssertionParam());
			$this->serializer->register(new com_wiris_quizzes_CorrectAnswer());
			$this->serializer->register(new com_wiris_quizzes_LocalData());
			$this->serializer->register(new com_wiris_quizzes_MathContent());
			$this->serializer->register(new com_wiris_quizzes_MultipleQuestionRequest());
			$this->serializer->register(new com_wiris_quizzes_MultipleQuestionResponse());
			$this->serializer->register(new com_wiris_quizzes_Option());
			$this->serializer->register(new com_wiris_quizzes_ProcessGetCheckAssertions());
			$this->serializer->register(new com_wiris_quizzes_ProcessGetVariables());
			$this->serializer->register(new com_wiris_quizzes_Question());
			$this->serializer->register(new com_wiris_quizzes_QuestionRequest());
			$this->serializer->register(new com_wiris_quizzes_QuestionResponse());
			$this->serializer->register(new com_wiris_quizzes_QuestionInstance());
			$this->serializer->register(new com_wiris_quizzes_ResultError());
			$this->serializer->register(new com_wiris_quizzes_ResultErrorLocation());
			$this->serializer->register(new com_wiris_quizzes_ResultGetCheckAssertions());
			$this->serializer->register(new com_wiris_quizzes_ResultGetVariables());
			$this->serializer->register(new com_wiris_quizzes_UserData());
			$this->serializer->register(new com_wiris_quizzes_Variable());
		}
		return $this->serializer;
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
	static $singleton;
	static function getInstance() {
		if(com_wiris_quizzes_RequestBuilder::$singleton === null) {
			com_wiris_quizzes_RequestBuilder::$singleton = new com_wiris_quizzes_RequestBuilder();
		}
		return com_wiris_quizzes_RequestBuilder::$singleton;
	}
	static function main() {
		$qi = "<questionInstance><userData><randomSeed>3333</randomSeed></userData></questionInstance>";
		$qqi = com_wiris_quizzes_RequestBuilder::getInstance()->readQuestionInstance($qi);
		haxe_Log::trace($qqi->serialize(), _hx_anonymous(array("fileName" => "RequestBuilder.hx", "lineNumber" => 299, "className" => "com.wiris.quizzes.RequestBuilder", "methodName" => "main")));
	}
	function __toString() { return 'com.wiris.quizzes.RequestBuilder'; }
}
