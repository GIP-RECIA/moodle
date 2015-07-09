<?php

class com_wiris_quizzes_QuestionInstance extends com_wiris_quizzes_Serializable {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
		$this->userData = new com_wiris_quizzes_UserData();
		$this->userData->randomSeed = Std::random(65536);
		$this->variables = null;
		$this->checks = null;
	}}
	public $userData;
	public $variables;
	public $checks;
	public function onSerialize($s) {
		$s->beginTag(com_wiris_quizzes_QuestionInstance::$tagName);
		$this->userData = $s->serializeChildName($this->userData, com_wiris_quizzes_UserData::$tagName);
		$this->checks = $this->checksToHash($s->serializeArrayName($this->hashToChecks($this->checks, null), "checks"), null);
		$this->variables = $this->variablesToHash($s->serializeArrayName($this->hashToVariables($this->variables, null), "variables"), null);
		$s->endTag();
	}
	public function newInstance() {
		return new com_wiris_quizzes_QuestionInstance();
	}
	public function expandVariables($text) {
		if($text === null) {
			return null;
		}
		$h = new com_wiris_quizzes_HTMLTools();
		return $h->expandVariables($text, $this->variables);
	}
	public function expandVariablesEquation($equation) {
		$h = new com_wiris_quizzes_HTMLTools();
		if(com_wiris_quizzes_MathContent::getMathType($equation) === com_wiris_quizzes_MathContent::$TYPE_TEXT) {
			$equation = $h->textToMathML($equation);
		}
		return $h->expandVariables($equation, $this->variables);
	}
	public function update($qs) {
		if($qs !== null && $qs->results !== null) {
			$variables = false;
			$checks = false;
			$i = null;
			{
				$_g1 = 0; $_g = $qs->results->length;
				while($_g1 < $_g) {
					$i1 = $_g1++;
					$r = $qs->results[$i1];
					$s = com_wiris_quizzes_RequestBuilder::getInstance()->getSerializer();
					$tag = $s->getTagName($r);
					if($tag === com_wiris_quizzes_ResultGetVariables::$tagName) {
						if(!$variables) {
							$variables = true;
							$this->variables = null;
						}
						$rgv = $r;
						$this->variables = $this->variablesToHash($rgv->variables, $this->variables);
						unset($rgv);
					} else {
						if($tag === com_wiris_quizzes_ResultGetCheckAssertions::$tagName) {
							if(!$checks) {
								$checks = true;
								$this->checks = null;
							}
							$rgca = $r;
							$this->checks = $this->checksToHash($rgca->checks, $this->checks);
							unset($rgca);
						}
					}
					unset($tag,$s,$r,$i1);
				}
			}
		}
	}
	public function clearVariables() {
		$this->variables = null;
	}
	public function clearChecks() {
		$this->checks = null;
	}
	public function hasVariables() {
		return $this->variables !== null && $this->variables->keys()->hasNext();
	}
	public function hasEvaluation() {
		return $this->checks !== null && $this->checks->keys()->hasNext();
	}
	public function isAnswerMatching($correctAnswer, $answer) {
		$correct = true;
		$checks = $this->checks->get($answer . "");
		$i = null;
		{
			$_g1 = 0; $_g = $checks->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$c = $checks[$i1];
				if($c->correctAnswer === $correctAnswer) {
					$correct = $correct && $c->value;
				}
				unset($i1,$c);
			}
		}
		return $correct;
	}
	public function isAnswerCorrect($answer) {
		$correct = true;
		$checks = $this->checks->get($answer . "");
		$i = null;
		{
			$_g1 = 0; $_g = $checks->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$correct = $correct && _hx_array_get($checks, $i1)->value;
				unset($i1);
			}
		}
		return $correct;
	}
	public function isAnswerSyntaxCorrect($answer) {
		$correct = true;
		$checks = $this->checks->get($answer . "");
		$i = null;
		{
			$_g1 = 0; $_g = $checks->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$ac = $checks[$i1];
				$j = null;
				{
					$_g3 = 0; $_g2 = com_wiris_quizzes_Assertion::$syntactic->length;
					while($_g3 < $_g2) {
						$j1 = $_g3++;
						if($ac->assertion === com_wiris_quizzes_Assertion::$syntactic[$j1]) {
							$correct = $correct && $ac->value;
						}
						unset($j1);
					}
					unset($_g3,$_g2);
				}
				unset($j,$i1,$ac);
			}
		}
		return $correct;
	}
	public function getMatchingChecks($correctAnswer, $userAnswer) {
		$result = new _hx_array(array());
		$checks = $this->checks->get($userAnswer . "");
		$i = null;
		{
			$_g1 = 0; $_g = $checks->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				if(_hx_array_get($checks, $i1)->correctAnswer === $correctAnswer) {
					$result->push($checks[$i1]);
				}
				unset($i1);
			}
		}
		return $result;
	}
	public function getAnswerFeedback($q, $answer, $lang, $correct, $incorrect, $syntax, $equivalent, $check) {
		$checks = $this->checks->get($answer . "");
		$h = new com_wiris_quizzes_HTMLGui($lang);
		$ass = new _hx_array(array());
		$i = null;
		{
			$_g1 = 0; $_g = $checks->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$c = $checks[$i1];
				if($correct && $c->value || $incorrect && !$c->value) {
					if($syntax && StringTools::startsWith($c->assertion, "syntax_") || $equivalent && StringTools::startsWith($c->assertion, "equivalent_") || $check && StringTools::startsWith($c->assertion, "check_")) {
						$ass->push($c);
					}
				}
				unset($i1,$c);
			}
		}
		$html = $h->getAssertionFeedback($q, $ass);
		return $html;
	}
	public function checksToHash($a, $h) {
		if($a === null) {
			return null;
		}
		if($h === null) {
			$h = new Hash();
		}
		$i = null;
		{
			$_g1 = 0; $_g = $a->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$c = $a[$i1];
				if(!$h->exists("" . $c->answer)) {
					$h->set("" . $c->answer, new _hx_array(array()));
				}
				$answerChecks = $h->get("" . $c->answer);
				$found = false;
				$j = null;
				{
					$_g3 = 0; $_g2 = $answerChecks->length;
					while($_g3 < $_g2) {
						$j1 = $_g3++;
						if(_hx_array_get($answerChecks, $j1)->assertion === $c->assertion && _hx_array_get($answerChecks, $j1)->correctAnswer === $c->correctAnswer) {
							$answerChecks[$j1] = $c;
							$found = true;
						}
						unset($j1);
					}
					unset($_g3,$_g2);
				}
				if(!$found) {
					$answerChecks->push($c);
				}
				unset($j,$i1,$found,$c,$answerChecks);
			}
		}
		return $h;
	}
	public function hashToChecks($h, $a) {
		if($h === null) {
			return null;
		}
		if($a === null) {
			$a = new _hx_array(array());
		}
		$answers = $h->keys();
		while($answers->hasNext()) {
			$answer = $answers->next();
			$a->concat($h->get($answer));
			unset($answer);
		}
		return $a;
	}
	public function variablesToHash($a, $h) {
		if($a === null) {
			return null;
		}
		if($h === null) {
			$h = new Hash();
		}
		$i = null;
		{
			$_g1 = 0; $_g = $a->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$v = $a[$i1];
				if(!$h->exists($v->type)) {
					$h->set($v->type, new Hash());
				}
				$h->get($v->type)->set($v->name, $v->content);
				unset($v,$i1);
			}
		}
		return $h;
	}
	public function hashToVariables($h, $a) {
		if($h === null) {
			return null;
		}
		if($a === null) {
			$a = new _hx_array(array());
		}
		$t = $h->keys();
		while($t->hasNext()) {
			$type = $t->next();
			$vars = $h->get($type);
			$names = $vars->keys();
			while($names->hasNext()) {
				$name = $names->next();
				$v = new com_wiris_quizzes_Variable();
				$v->type = $type;
				$v->name = $name;
				$v->content = $vars->get($name);
				$a->push($v);
				unset($v,$name);
			}
			unset($vars,$type,$names);
		}
		return $a;
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
	static $tagName = "questionInstance";
	function __toString() { return 'com.wiris.quizzes.QuestionInstance'; }
}
