<?php

class com_wiris_quizzes_test_Tester {
	public function __construct() { 
	}
	public function run() {
		$this->testImages();
		$this->testOpenQuestion();
		$this->testTolerance();
		$this->testRandomQuestion();
		$this->testEncodings();
		$h = new com_wiris_quizzes_HTMLTools();
		$h->unitTest();
		haxe_Log::trace("Successful test!", _hx_anonymous(array("fileName" => "Tester.hx", "lineNumber" => 26, "className" => "com.wiris.quizzes.test.Tester", "methodName" => "run")));
	}
	public function testImages() {
		$algorithm = "<session lang=\"en\" version=\"2.0\"><library closed=\"false\"><mtext style=\"color:#ffc800\" xml:lang=\"en\">variables</mtext><group><command><input><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi>p</mi><mo>&nbsp;</mo><mo>=</mo><mo>&nbsp;</mo><mi>plot</mi><mo>(</mo><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>)</mo></math></input></command></group></library></session>";
		$text = "#p";
		$expanded = "<img id=\"4e0fa2b5e6d8b12ce9fda6541fdb5557\" src=\"" . com_wiris_quizzes_QuizzesConfig::$QUIZZES_PROXY_URL . "?service=cache&amp;name=4e0fa2b5e6d8b12ce9fda6541fdb5557.png\"/>";
		$q = new com_wiris_quizzes_Question();
		$q->wirisCasSession = $algorithm;
		$rb = com_wiris_quizzes_RequestBuilder::getInstance();
		$qi = new com_wiris_quizzes_QuestionInstance();
		$r = $rb->newVariablesRequest($text, $q, $qi);
		$s = new com_wiris_quizzes_QuizzesService(null);
		$p = $s->execute($r);
		$qi->update($p);
		$res = $qi->expandVariables($text);
		if(!($res === $expanded)) {
			throw new HException("Failed test!. Got:\x0A" . $res);
		}
	}
	public function testOpenQuestion() {
		$correctAnswer = "1+1";
		$userAnswer = "2";
		$rb = com_wiris_quizzes_RequestBuilder::getInstance();
		$eqs = $rb->newEvalRequest($correctAnswer, $userAnswer, null, null);
		$quizzes = new com_wiris_quizzes_QuizzesService(null);
		$vqs = $quizzes->execute($eqs);
		$qi = new com_wiris_quizzes_QuestionInstance();
		$qi->update($vqs);
		$syntax = $qi->isAnswerSyntaxCorrect(0);
		$correct = $qi->isAnswerCorrect(0);
		if(!$correct) {
			throw new HException("Failed test!");
		}
	}
	public function testTolerance() {
		$correctAnswer = "<math><mfrac><mn>1</mn><mn>2</mn></mfrac></math>";
		$userAnswer = "0.501";
		$rb = com_wiris_quizzes_RequestBuilder::getInstance();
		$req = $rb->newEvalRequest($correctAnswer, $userAnswer, null, null);
		$req->question->setOption(com_wiris_quizzes_Option::$OPTION_TOLERANCE, "10^(-3)");
		$s = new com_wiris_quizzes_QuizzesService(null);
		$res = $s->execute($req);
		$qi = new com_wiris_quizzes_QuestionInstance();
		$qi->update($res);
		if($qi->isAnswerCorrect(0)) {
			throw new HException("Failed test! ");
		}
		$req->question->setOption(com_wiris_quizzes_Option::$OPTION_TOLERANCE, "10^(-2)");
		$res = $s->execute($req);
		$qi = new com_wiris_quizzes_QuestionInstance();
		$qi->update($res);
		if(!$qi->isAnswerCorrect(0)) {
			throw new HException("Failed test! ");
		}
	}
	public function testRandomQuestion() {
		$session = "<session lang=\"en\" version=\"2.0\"><library closed=\"false\"><mtext style=\"color:#ffc800\" xml:lang=\"en\">variables</mtext><group><command><input><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi>a</mi><mo>=</mo><mn>1</mn></math></input></command><command><input><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi>b</mi><mo>=</mo><mn>2</mn></math></input></command></group></library></session>";
		$correctAnswer = "#a";
		$text = "Hello! How much is #b - #a?";
		$q = new com_wiris_quizzes_Question();
		$q->wirisCasSession = $session;
		$q->setAssertion(com_wiris_quizzes_Assertion::$SYNTAX_EXPRESSION, 0, 0);
		$q->setAssertion(com_wiris_quizzes_Assertion::$EQUIVALENT_SYMBOLIC, 0, 0);
		$q->setAssertion(com_wiris_quizzes_Assertion::$CHECK_SIMPLIFIED, 0, 0);
		$qi = new com_wiris_quizzes_QuestionInstance();
		$rb = com_wiris_quizzes_RequestBuilder::getInstance();
		$vqr = $rb->newVariablesRequest($text . " " . $correctAnswer, $q, $qi);
		$quizzes = new com_wiris_quizzes_QuizzesService(null);
		$vqs = $quizzes->execute($vqr);
		$qi->update($vqs);
		$deliveryText = $qi->expandVariables($text);
		if(!($deliveryText === "Hello! How much is <math><mrow><mn>2</mn></mrow></math> - <math><mrow><mn>1</mn></mrow></math>?")) {
			throw new HException("Failed Test!");
		}
		$userAnswer = "1";
		$eqr = $rb->newEvalRequest($correctAnswer, $userAnswer, $q, $qi);
		$eqs = $quizzes->execute($eqr);
		$qi->update($eqs);
		$syntax = $qi->isAnswerSyntaxCorrect(0);
		$correct = $qi->isAnswerCorrect(0);
		if(!$correct || !$syntax) {
			throw new HException("Failed Test!");
		}
		$feedback = $qi->getAnswerFeedback($q, 0, "en", true, true, true, true, true);
	}
	public function testEncodings() {
		$session = "<session lang=\"en\" version=\"2.0\"><group><command><input><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi>a</mi><mo>=</mo><mi>x</mi><mo>*</mo><mi>y</mi><mo>+</mo><reals/><cn>-&infin;</cn><mo>+</mo><pi/><mo>&nbsp;</mo><csymbol definitionURL=\"http://.../units/minute/angular\">&apos;</csymbol><csymbol definitionURL=\"http://.../units/degree/angular\">&deg;</csymbol><mi>&Theta;</mi></math></input><output><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><pi/><mo>*</mo><mfenced><mrow><csymbol definitionURL=\"http://.../units/degree/angular\">&deg;</csymbol><mo>&nbsp;</mo><csymbol definitionURL=\"http://.../units/minute/angular\">&apos;</csymbol></mrow></mfenced><mo>+</mo><mfenced><mrow><reals/><mo>+</mo><cn>-&infin;</cn><mo>+</mo><mi>x</mi><mo>*</mo><mi>y</mi></mrow></mfenced><mo>+</mo><mi>&Theta;</mi></math></output></command></group><group><command><input><math xmlns=\"http://www.w3.org/1998/Math/MathML\"/></input></command></group></session>";
		$text = "Encode #a.";
		$result = "Encode <math><mrow><mi mathvariant=\"normal\">&#960;</mi><mo>&#183;</mo><mfenced><mrow><mo>&#176;</mo><mo>'</mo></mrow></mfenced><mo>+</mo><mfenced><mrow><mo>&#8477;</mo><mo>+</mo><mo>-&#8734;</mo><mo>+</mo><mi>x</mi><mo>&#183;</mo><mi>y</mi></mrow></mfenced><mo>+</mo><mi>&#920;</mi></mrow></math>.";
		$q = new com_wiris_quizzes_Question();
		$qi = new com_wiris_quizzes_QuestionInstance();
		$q->wirisCasSession = $session;
		$r = com_wiris_quizzes_RequestBuilder::getInstance()->newVariablesRequest($text, $q, $qi);
		$s = new com_wiris_quizzes_QuizzesService(null);
		$qi->update($s->execute($r));
		$expanded = $qi->expandVariables($text);
		if(!($expanded === $result)) {
			throw new HException("Failed Test!");
		}
	}
	static function main() {
		$t = new com_wiris_quizzes_test_Tester();
		$t->run();
	}
	function __toString() { return 'com.wiris.quizzes.test.Tester'; }
}
