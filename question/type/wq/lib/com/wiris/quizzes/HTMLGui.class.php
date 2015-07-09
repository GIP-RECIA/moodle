<?php

class com_wiris_quizzes_HTMLGui {
	public function __construct($lang) {
		if(!php_Boot::$skip_constructor) {
		$this->lang = (($lang !== null) ? $lang : "en");
		$this->t = com_wiris_quizzes_Translator::getInstance($this->lang);
	}}
	public $t;
	public $lang;
	public function getCorrectAnswerInput($q, $qi, $correctAnswer, $inPopup, $classes) {
		$conf = new com_wiris_quizzes_HTMLGuiConfig($classes);
		$h = new com_wiris_quizzes_HTML();
		if($q === null) {
			$q = new com_wiris_quizzes_Question();
		}
		if($q->correctAnswers === null) {
			$q->correctAnswers = new _hx_array(array());
		}
		$a = null;
		if($q->correctAnswers->length > $correctAnswer) {
			$a = $q->correctAnswers[$correctAnswer];
		}
		if($a === null) {
			$a = new com_wiris_quizzes_CorrectAnswer();
			$a->id = $correctAnswer;
			$a->type = com_wiris_quizzes_MathContent::$TYPE_MATHML;
			$a->content = "";
		}
		$unique = com_wiris_quizzes_HTMLGui::getNewId();
		if(!$inPopup) {
			$this->printWirisTextfield($h, "wiriscorrectanswer", $correctAnswer, $a->content, $unique, $conf);
			$this->printAssertionsSummary($h, $q, $a, $unique, $conf);
		} else {
			$this->printTabs($h, $q, $qi, $correctAnswer, $this->lang, $unique, $conf);
			$this->printSubmitButtons($h, $unique . "[" . $correctAnswer . "]");
		}
		return $h->getString();
	}
	public function openVerticalTabs($h, $menu, $unique) {
		$h->openDivClass("wiristabs" . $unique, "wiristabs");
		$h->openDivClass(null, "wiristabsleftcolumn");
		$h->openDivClass(null, "wiristablistwrapper");
		$h->openUl("wiristablist" . $unique, "wiristablist");
		$i = null;
		{
			$_g1 = 0; $_g = $menu->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$h->open("li", new _hx_array(array(new _hx_array(array("class", "wiristab " . $menu[$i1][2])))));
				$h->openA("wiristablink" . $unique . "[" . $menu[$i1][0] . "]", null, "wiristablink");
				$h->text($menu[$i1][1]);
				$h->close();
				$h->close();
				unset($i1);
			}
		}
		$h->close();
		$h->close();
		$h->openDivClass(null, "wirishelpwrapper");
		{
			$_g1 = 0; $_g = $menu->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$h->openDivClass("wiristabhelp" . $unique . "[" . $menu[$i1][0] . "]", "wiristabhelp");
				$h->formatText($menu[$i1][3]);
				$h->close();
				unset($i1);
			}
		}
		$h->close();
		$h->close();
	}
	public function printTabs($h, $q, $qi, $correctAnswer, $lang, $unique, $conf) {
		$menu = new _hx_array(array());
		if($conf->tabCorrectAnswer) {
			$menu->push(new _hx_array(array("wiriscorrectanswertab" . $unique, $this->t->t("correctanswer"), "wiriscorrectanswertab", $this->t->t("correctanswertabhelp"))));
		}
		if($conf->tabValidation) {
			$menu->push(new _hx_array(array("wirisassertionstab" . $unique, $this->t->t("validation"), "wirisassertionstab", $this->t->t("assertionstabhelp"))));
		}
		if($conf->tabVariables) {
			$menu->push(new _hx_array(array("wirisvariablestab" . $unique, $this->t->t("variables"), "wirisvariablestab", $this->t->t("variablestabhelp"))));
		}
		if($conf->tabPreview) {
			$menu->push(new _hx_array(array("wiristesttab" . $unique, $this->t->t("preview"), "wiristesttab", $this->t->t("testtabhelp"))));
		}
		$this->openVerticalTabs($h, $menu, $unique);
		$h->openDivClass("wiristabcontentwrapper" . $unique, "wiristabcontentwrapper");
		$tabid = "wiristabcontent" . $unique;
		$tabclass = "wiristabcontent wirishidden";
		$tabcount = 0;
		if($conf->tabCorrectAnswer) {
			$h->openDivClass($tabid . "[" . $menu[$tabcount][0] . "]", $tabclass);
			$h->openDivClass("wiriseditorwrapper" . $unique, "wiriseditorwrapper");
			$this->printWirisEditor($h, $lang, "wiriscorrectanswer" . $unique . "[" . $correctAnswer . "]", "", $unique);
			$h->close();
			$this->printLocalData($h, $q, $unique);
			$h->close();
			$tabcount++;
		}
		if($conf->tabValidation) {
			$h->openDivClass($tabid . "[" . $menu[$tabcount][0] . "]", $tabclass);
			$this->printInputControls($h, $q, $correctAnswer, $unique);
			$this->printAssertionsControls($h, $q, $correctAnswer, $unique);
			$h->close();
			$tabcount++;
		}
		if($conf->tabVariables) {
			$h->openDivClass($tabid . "[" . $menu[$tabcount][0] . "]", $tabclass);
			$this->printWirisCas($h, $q->wirisCasSession, $unique);
			$h->openDivClass("wiriscasbottomwrapper" . $unique, "wiriscasbottomwrapper");
			$this->printOutputControls($h, $unique);
			$h->close();
			$h->close();
			$tabcount++;
		}
		if($conf->tabPreview) {
			$h->openDivClass($tabid . "[" . $menu[$tabcount][0] . "]", $tabclass);
			$this->printTester($h, $q, $qi, $correctAnswer, $unique);
			$h->close();
			$tabcount++;
		}
		$h->close();
		$h->close();
	}
	public function getUserAnswerInput($q, $qi, $answer, $inPopup, $classes) {
		$conf = new com_wiris_quizzes_HTMLGuiConfig($classes);
		$h = new com_wiris_quizzes_HTML();
		$content = null;
		if($qi !== null && $qi->userData !== null && $qi->userData->answers !== null && $answer < $qi->userData->answers->length) {
			$content = _hx_array_get($qi->userData->answers, $answer)->content;
		} else {
			$content = "";
		}
		$unique = com_wiris_quizzes_HTMLGui::getNewId();
		$input = $q->getLocalData(com_wiris_quizzes_LocalData::$KEY_OPENANSWER_INPUT_FIELD);
		if($inPopup || $input === com_wiris_quizzes_LocalData::$VALUE_OPENANSWER_INPUT_FIELD_INLINE_EDITOR) {
			$this->printWirisEditor($h, $this->lang, "wirisanswer" . $unique . "[" . $answer . "]", $content, $unique);
		} else {
			if($input === com_wiris_quizzes_LocalData::$VALUE_OPENANSWER_INPUT_FIELD_POPUP_EDITOR) {
				$this->printWirisTextfield($h, "wirisanswer", $answer, $content, $unique, $conf);
			} else {
				$h->input("text", "wirisanswer" . $unique . "[" . $answer . "]", null, $content, null, "wirisplaintextinput");
			}
		}
		if($inPopup) {
			$this->printSubmitButtons($h, $unique . "[" . $answer . "]");
		}
		return $h->getString();
	}
	public function printSubmitButtons($h, $suffix) {
		$h->openDivClass("wirissubmitbuttons" . $suffix, "wirissubmitbuttons");
		$h->openDivClass("wirissubmitbuttonswrapper" . $suffix, "wirissubmitbuttonswrapper");
		$h->input("button", "wirisacceptbutton" . $suffix, "", $this->t->t("accept"), null, "wirissubmitbutton wirisbutton");
		$h->input("button", "wiriscancelbutton" . $suffix, "", $this->t->t("cancel"), null, "wiriscancelbutton wirisbutton");
		$h->close();
		$h->close();
	}
	public function getAssertionFeedback($q, $a) {
		$h = new com_wiris_quizzes_HTML();
		$h->openUl(null, "wirisfeedbacklist");
		$i = null;
		{
			$_g1 = 0; $_g = $a->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$c = $a[$i1];
				$h->openLi();
				$className = (($c->value) ? "wiriscorrect" : "wirisincorrect");
				$suffix = (($c->value) ? "_correct_feedback" : "_incorrect_feedback");
				$h->openSpan(null, $className);
				$text = $this->t->t($c->assertion . $suffix);
				if($q !== null && $q->assertions !== null) {
					$index = $q->getAssertionIndex($c->assertion, $c->correctAnswer, $c->answer);
					if($index !== -1) {
						$ass = $q->assertions[$index];
						if($ass->parameters !== null) {
							$j = null;
							{
								$_g3 = 0; $_g2 = $ass->parameters->length;
								while($_g3 < $_g2) {
									$j1 = $_g3++;
									$p = $ass->parameters[$j1];
									$text = str_replace("\${" . $p->name . "}", $p->content, $text);
									unset($p,$j1);
								}
								unset($_g3,$_g2);
							}
							unset($j);
						}
						unset($ass);
					}
					unset($index);
				}
				$h->text($text);
				$h->close();
				$h->close();
				unset($text,$suffix,$i1,$className,$c);
			}
		}
		$h->close();
		return $h->getString();
	}
	public function syntaxCheckbox($h, $id, $value, $label, $all) {
		$className = (($all) ? "wirisassertionparamall" : null);
		$h->openSpan(null, "wirishorizontalparam");
		$h->input("checkbox", $id, null, $value, $value, $className);
		$h->label($label, $id, null);
		$h->close();
	}
	public function printInputControls($h, $q, $correctAnswer, $unique) {
		$id = null;
		$h->openDiv("wirisinputcontrols" . $unique);
		$h->openFieldset("wirisinputcontrolsfieldset" . $unique, $this->t->t("allowedinput"), "wirismainfieldset");
		$h->help("wirisinputcontrolshelp" . $unique, com_wiris_quizzes_QuizzesConfig::$QUIZZES_SERVICE_URL . "/assertions.xml?type=syntax", $this->t->t("manual"));
		$h->openDivClass("wirissyntaxassertions" . $unique, "wirissyntaxassertions");
		$h->openUl("wirisinputcontrolslist" . $unique, "wirisinputcontrolslist");
		$i = null;
		{
			$_g1 = 0; $_g = com_wiris_quizzes_Assertion::$syntactic->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				if(com_wiris_quizzes_Assertion::$syntactic[$i1] === com_wiris_quizzes_Assertion::$SYNTAX_LIST) {
					continue;
				}
				$h->openLi();
				$id = "wirisassertion" . $unique . "[" . com_wiris_quizzes_Assertion::$syntactic[$i1] . "][" . $correctAnswer . "][0]";
				$h->input("radio", $id, "wirisradiosyntax" . $unique, null, null, null);
				$h->openStrong();
				$h->label($this->t->t(com_wiris_quizzes_Assertion::$syntactic[$i1]), $id, null);
				$h->close();
				$h->text(" ");
				$h->label($this->t->t(com_wiris_quizzes_Assertion::$syntactic[$i1] . "_description"), $id, null);
				$h->close();
				unset($i1);
			}
		}
		$h->close();
		$h->openFieldset("wirissyntaxparams" . $unique, $this->t->t("syntaxparams"), "wirissyntaxparams");
		$h->openDivClass("wirissyntaxconstants" . $unique, "wirissyntaxparam");
		$h->openSpan("wirissyntaxconstantslabel" . $unique, "wirissyntaxlabel");
		$h->text($this->t->t("constants"));
		$h->close();
		$id = "wirisassertionparampart" . $unique . "[syntax_expression, syntax_quantity, syntax_list][constants][" . $correctAnswer . "][0]";
		$letterpi = php_Utf8::uchr(960);
		$this->syntaxCheckbox($h, $id . "[0]", $letterpi, $letterpi, false);
		$this->syntaxCheckbox($h, $id . "[1]", "e", "e", false);
		$this->syntaxCheckbox($h, $id . "[2]", "i", "i", false);
		$this->syntaxCheckbox($h, $id . "[3]", "j", "j", false);
		$h->close();
		$h->openDivClass("wirissyntaxfunctions" . $unique, "wirissyntaxparam");
		$h->openDiv("wirissyntaxfunctionscheckboxes" . $unique);
		$h->openSpan("wirissyntaxfunctionlabel" . $unique, "wirissyntaxlabel");
		$h->text($this->t->t("functions"));
		$h->close();
		$id = "wirisassertionparampart" . $unique . "[syntax_expression, syntax_list][functions][" . $correctAnswer . "][0]";
		$this->syntaxCheckbox($h, $id . "[0]", "exp, log, ln", $this->t->t("explog"), false);
		$this->syntaxCheckbox($h, $id . "[1]", "sin, cos, tan, asin, acos, atan, cosec, sec, cotan, acosec, asec, acotan", $this->t->t("trigonometric"), false);
		$this->syntaxCheckbox($h, $id . "[2]", "sinh, cosh, tanh, asinh, acosh, atanh", $this->t->t("hyperbolic"), false);
		$this->syntaxCheckbox($h, $id . "[3]", "min, max, sign", $this->t->t("arithmetic"), false);
		$h->close();
		$h->openDiv("wirissyntaxfunctionscustom" . $unique);
		$h->openSpan("wirissyntaxuserfunctionlabel" . $unique, "wirissyntaxlabel");
		$h->label($this->t->t("userfunctions"), $id . "[4]", null);
		$h->close();
		$h->input("text", $id . "[4]", "", null, null, "wirisuserfunctions");
		$h->close();
		$h->close();
		$h->openDivClass("wirissyntaxunits" . $unique, "wirissyntaxparam");
		$h->openSpan("wirissyntaxunitslabel" . $unique, "wirissyntaxlabel");
		$h->text($this->t->t("units"));
		$h->close();
		$id = "wirisassertionparampart" . $unique . "[syntax_quantity][units][" . $correctAnswer . "][0]";
		$this->syntaxCheckbox($h, $id . "[0]", "m", "m", false);
		$this->syntaxCheckbox($h, $id . "[1]", "s", "s", false);
		$this->syntaxCheckbox($h, $id . "[2]", "g", "g", false);
		$this->syntaxCheckbox($h, $id . "[3]", "sr, m, g, s, E, K, mol, cd, rad, h, min, l, N, Pa, Hz, W,J, C, V, " . php_Utf8::uchr(937) . ", F, S, Wb, b, H, T, lx, lm, Gy, Bq, Sv, kat", $this->t->t("all"), true);
		$h->close();
		$h->openDivClass("wirissyntaxunitprefixes" . $unique, "wirissyntaxparam");
		$h->openSpan("wirissyntaxunitslabel" . $unique, "wirissyntaxlabel");
		$h->text($this->t->t("unitprefixes"));
		$h->close();
		$id = "wirisassertionparampart" . $unique . "[syntax_quantity][unitprefixes][" . $correctAnswer . "][0]";
		$this->syntaxCheckbox($h, $id . "[0]", "M", "M", false);
		$this->syntaxCheckbox($h, $id . "[1]", "k", "k", false);
		$this->syntaxCheckbox($h, $id . "[2]", "c", "c", false);
		$this->syntaxCheckbox($h, $id . "[3]", "m", "m", false);
		$this->syntaxCheckbox($h, $id . "[4]", "y, z, a, f, p, n, " . php_Utf8::uchr(181) . ", m, c, d, da, h, k, M, G, T, P, E, Z, Y", $this->t->t("all"), true);
		$h->close();
		$h->openDivClass("wirissyntaxmixedfractions" . $unique, "wirissyntaxparam");
		$id = "wirisassertionparam" . $unique . "[syntax_quantity][mixedfractions][" . $correctAnswer . "][0]";
		$h->openSpan("wirissyntaxmixedfractionslabel" . $unique, "wirissyntaxlabel");
		$h->label($this->t->t("mixedfractions") . ":", $id, null);
		$h->close();
		$h->input("checkbox", $id, "", "true", null, null);
		$h->close();
		$h->close();
		$h->close();
		$h->openDiv("wiristolerance" . $unique);
		$idtol = "wirisoption" . $unique . "[" . com_wiris_quizzes_Option::$OPTION_TOLERANCE . "]";
		$h->label($this->t->t("tolerancedigits"), $idtol, "wirisleftlabel2");
		$h->text(" ");
		$h->input("text", $idtol, "", null, null, null);
		$idRelTol = "wirisoption" . $unique . "[" . com_wiris_quizzes_Option::$OPTION_RELATIVE_TOLERANCE . "]";
		$h->input("checkbox", $idRelTol, "", null, null, null);
		$h->label($this->t->t("relative"), $idRelTol, null);
		$h->close();
		$h->close();
		$h->close();
	}
	public function getWirisCasLanguages() {
		$langs = new _hx_array(array(new _hx_array(array("ca", $this->t->t("Catalan"))), new _hx_array(array("en", $this->t->t("English"))), new _hx_array(array("es", $this->t->t("Spanish"))), new _hx_array(array("et", $this->t->t("Estonian"))), new _hx_array(array("eu", $this->t->t("Basque"))), new _hx_array(array("fr", $this->t->t("French"))), new _hx_array(array("de", $this->t->t("German"))), new _hx_array(array("it", $this->t->t("Italian"))), new _hx_array(array("nl", $this->t->t("Dutch"))), new _hx_array(array("pt", $this->t->t("Portuguese")))));
		return $langs;
	}
	public function printOutputControls($h, $unique) {
		$h->openDivClass("wirisalgorithmlanguagediv" . $unique, "wirisalgorithmlanguage");
		$h->label($this->t->t("algorithmlanguage"), "wirislagorithmlanguage", null);
		$h->text(" ");
		$langs = $this->getWirisCasLanguages();
		$h->select("wirisalgorithmlanguage" . $unique, null, $langs);
		$h->close();
		$h->openDiv("wirisoutputcontrols" . $unique);
		$h->openFieldset("wirisoutputcontrolsfieldset" . $unique, $this->t->t("Output options"), "wirismainfieldset");
		$h->help("wirisoutputcontrolshelp" . $unique, com_wiris_quizzes_QuizzesConfig::$QUIZZES_SERVICE_URL . "/assertions.xml", $this->t->t("manual"));
		$h->openUl("wirisoutputcontrolslist" . $unique, "wirisoutputcontrolslist");
		$id = null;
		$h->openLi();
		$id = "wirisoption" . $unique . "[" . com_wiris_quizzes_Option::$OPTION_PRECISION . "]";
		$h->label($this->t->t(com_wiris_quizzes_Option::$OPTION_PRECISION), $id, "wirisleftlabel");
		$h->input("text", $id, null, null, null, null);
		$h->close();
		$h->openLi();
		$id = "wirisoption" . $unique . "[" . com_wiris_quizzes_Option::$OPTION_IMPLICIT_TIMES_OPERATOR . "]";
		$h->label($this->t->t(com_wiris_quizzes_Option::$OPTION_IMPLICIT_TIMES_OPERATOR), $id, "wirisleftlabel");
		$h->input("checkbox", $id, null, "true", $this->t->t($id), null);
		$h->close();
		$h->openLi();
		$id = "wirisoptionpart" . $unique . "[" . com_wiris_quizzes_Option::$OPTION_TIMES_OPERATOR . "]";
		$h->openSpan(null, "wirisleftlabel");
		$h->text($this->t->t(com_wiris_quizzes_Option::$OPTION_TIMES_OPERATOR));
		$h->close();
		$h->openSpan(null, "wirishorizontalparam");
		$h->input("radio", $id . "[0]", $id, php_Utf8::uchr(183), php_Utf8::uchr(183), null);
		$h->label("a" . php_Utf8::uchr(183) . "b", $id . "[0]", null);
		$h->close();
		$h->openSpan(null, "wirishorizontalparam");
		$h->input("radio", $id . "[1]", $id, php_Utf8::uchr(215), php_Utf8::uchr(215), null);
		$h->label("a" . php_Utf8::uchr(215) . "b", $id . "[1]", null);
		$h->close();
		$h->close();
		$h->openLi();
		$id = "wirisoptionpart" . $unique . "[" . com_wiris_quizzes_Option::$OPTION_IMAGINARY_UNIT . "]";
		$h->openSpan(null, "wirisleftlabel");
		$h->text($this->t->t(com_wiris_quizzes_Option::$OPTION_IMAGINARY_UNIT));
		$h->close();
		$h->openSpan(null, "wirishorizontalparam");
		$h->input("radio", $id . "[0]", $id, "i", "i", null);
		$h->label("i", $id . "[0]", null);
		$h->close();
		$h->openSpan(null, "wirishorizontalparam");
		$h->input("radio", $id . "[1]", $id, "j", "j", null);
		$h->label("j", $id . "[1]", null);
		$h->close();
		$h->close();
		$h->close();
		$h->close();
		$h->close();
	}
	public function printWirisCas($h, $session, $unique) {
		$h->openDivClass("wiriscaswrapper" . $unique, "wiriscaswrapper");
		$caslang = com_wiris_quizzes_HTMLGui_0($this, $h, $session, $unique);
		$h->raw($this->getWirisCasApplet("wiriscas" . $unique, $caslang));
		$h->close();
	}
	public function getWirisCasApplet($id, $lang) {
		$h = new com_wiris_quizzes_HTML();
		$h->open("applet", new _hx_array(array(new _hx_array(array("id", $id)), new _hx_array(array("name", "wiriscas")), new _hx_array(array("codebase", com_wiris_quizzes_QuizzesConfig::$WIRIS_SERVICE_URL . "/wiris-codebase")), new _hx_array(array("code", "WirisApplet_net_" . $lang)), new _hx_array(array("archive", "wrs_net_" . $lang . ".jar")), new _hx_array(array("height", "100%")), new _hx_array(array("width", "100%")))));
		$h->openclose("param", new _hx_array(array(new _hx_array(array("name", "command")), new _hx_array(array("value", "false")))));
		$h->openclose("param", new _hx_array(array(new _hx_array(array("name", "commands")), new _hx_array(array("value", "false")))));
		$h->openclose("param", new _hx_array(array(new _hx_array(array("name", "interface")), new _hx_array(array("value", "false")))));
		$h->close();
		return $h->getString();
	}
	public function getAssertionString($a, $chars) {
		$sb = new StringBuf();
		{
			$x = $this->t->t($a->name);
			if(is_null($x)) {
				$x = "null";
			} else {
				if(is_bool($x)) {
					$x = (($x) ? "true" : "false");
				}
			}
			$sb->b .= $x;
		}
		if($a->parameters !== null && $a->parameters->length > 0) {
			$i = null;
			{
				$_g1 = 0; $_g = $a->parameters->length;
				while($_g1 < $_g) {
					$i1 = $_g1++;
					{
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
						$x = _hx_array_get($a->parameters, $i1)->content;
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
		}
		$res = $sb->b;
		if(strlen($res) > $chars) {
			$res = _hx_substr($res, 0, $chars - 3) . "...";
		}
		return $res;
	}
	public function printAssertionsSummary($h, $q, $ca, $unique, $conf) {
		$syntax = null;
		$equivalent = null;
		$properties = new _hx_array(array());
		if($q->assertions !== null) {
			$i = null;
			{
				$_g1 = 0; $_g = $q->assertions->length;
				while($_g1 < $_g) {
					$i1 = $_g1++;
					$a = $q->assertions[$i1];
					if($ca->id === $a->correctAnswer) {
						$text = $this->getAssertionString($a, 40);
						if(StringTools::startsWith($a->name, "syntax_")) {
							$syntax = $text;
						} else {
							if(StringTools::startsWith($a->name, "equivalent_")) {
								$equivalent = $text;
							} else {
								$properties->push($text);
							}
						}
						unset($text);
					}
					unset($i1,$a);
				}
			}
		}
		$h->openDiv("assertionssummarydiv" . $unique);
		$h->openUl("assertionssummary" . $unique, "assertionssummary");
		if($syntax !== null) {
			$h->openLi();
			$h->text($this->t->t("allowedinput"));
			$h->text(": ");
			$h->textEm($syntax);
			$h->close();
		}
		if($equivalent !== null) {
			$h->openLi();
			$h->text($this->t->t("comparison"));
			$h->text(": ");
			$h->textEm($equivalent);
			$h->close();
		}
		if($properties->length > 0) {
			$h->openLi();
			$h->text($this->t->t("properties"));
			$h->text(":");
			$h->openUl("assertionsummarychecks" . $unique, "assertionsummarychecks");
			$i = null;
			{
				$_g1 = 0; $_g = $properties->length;
				while($_g1 < $_g) {
					$i1 = $_g1++;
					$h->openLi();
					$h->textEm($properties[$i1]);
					$h->close();
					unset($i1);
				}
			}
			$h->close();
			$h->close();
		}
		if($q->wirisCasSession !== null && strlen($q->wirisCasSession) > 0) {
			$h->openLi();
			$h->text($this->t->t("hasalgorithm"));
			$h->close();
		}
		$h->close();
		$h->close();
	}
	public function printAssertionsControls($h, $q, $correctAnswer, $unique) {
		$h->openDiv("wirisassertioncontrols" . $unique);
		$h->openFieldset("wiriscomparisonfieldset" . $unique . "[" . $correctAnswer . "][0]", $this->t->t("comparisonwithstudentanswer"), "wirismainfieldset");
		$h->help("wiriscomparisonhelp" . $unique, com_wiris_quizzes_QuizzesConfig::$QUIZZES_SERVICE_URL . "/assertions.xml?type=equivalent", $this->t->t("manual"));
		$h->openUl("wiriscomparison" . $unique . "[" . $correctAnswer . "][0]", "wirisul");
		$i = null;
		$idassertion = null;
		{
			$_g1 = 0; $_g = com_wiris_quizzes_Assertion::$equivalent->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$h->openLi();
				$idassertion = "wirisassertion" . $unique . "[" . com_wiris_quizzes_Assertion::$equivalent[$i1] . "][" . $correctAnswer . "][0]";
				$h->input("radio", $idassertion, "wirisradiocomparison" . $unique . "[" . $correctAnswer . "][0]", null, null, null);
				$h->label($this->t->t(com_wiris_quizzes_Assertion::$equivalent[$i1]), $idassertion, null);
				if(com_wiris_quizzes_Assertion::$equivalent[$i1] === com_wiris_quizzes_Assertion::$EQUIVALENT_FUNCTION) {
					$h->text(" ");
					$h->input("text", "wirisassertionparam" . $unique . "[" . com_wiris_quizzes_Assertion::$EQUIVALENT_FUNCTION . "][name][" . $correctAnswer . "][0]", "", "", null, null);
				}
				$h->close();
				unset($i1);
			}
		}
		$h->close();
		$h->close();
		$h->openFieldset("wirisadditionalchecksfieldset" . $unique . "[" . $correctAnswer . "][0]", $this->t->t("additionalproperties"), "wirismainfieldset");
		$h->help("wirisadditionalcheckshelp" . $unique, com_wiris_quizzes_QuizzesConfig::$QUIZZES_SERVICE_URL . "/assertions.xml?type=check", $this->t->t("manual"));
		$h->openDivClass("wirisstructurediv" . $unique . "[" . $correctAnswer . "][0]", "wirissecondaryfieldset");
		$h->openDivClass("wirisstructuredivlegend" . $unique . "[" . $correctAnswer . "][0]", "wirissecondaryfieldsetlegend");
		$h->text($this->t->t("structure:"));
		$h->close();
		$options = new _hx_array(array());
		$options[0] = new _hx_array(array());
		$options[0][0] = "";
		$options[0][1] = $this->t->t("none");
		{
			$_g1 = 0; $_g = com_wiris_quizzes_Assertion::$structure->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$options[$i1 + 1] = new _hx_array(array());
				$options[$i1 + 1][0] = com_wiris_quizzes_Assertion::$structure[$i1];
				$options[$i1 + 1][1] = $this->t->t(com_wiris_quizzes_Assertion::$structure[$i1]);
				unset($i1);
			}
		}
		$h->select("wirisstructureselect" . $unique . "[" . $correctAnswer . "][0]", "", $options);
		$h->close();
		$h->openDivClass("wirismorediv" . $unique . "[" . $correctAnswer . "][0]", "wirissecondaryfieldset");
		$h->text($this->t->t("more:"));
		$h->openUl("wirismore" . $unique . "[" . $correctAnswer . "][0]", "wirisul");
		{
			$_g1 = 0; $_g = com_wiris_quizzes_Assertion::$checks->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$h->openLi();
				$idassertion = "wirisassertion" . $unique . "[" . com_wiris_quizzes_Assertion::$checks[$i1] . "][" . $correctAnswer . "][0]";
				$h->input("checkbox", $idassertion, null, null, null, null);
				$h->label($this->t->t(com_wiris_quizzes_Assertion::$checks[$i1]), $idassertion, null);
				$parameters = com_wiris_quizzes_Assertion::getParameterNames(com_wiris_quizzes_Assertion::$checks[$i1]);
				if($parameters !== null) {
					$j = null;
					{
						$_g3 = 0; $_g2 = $parameters->length;
						while($_g3 < $_g2) {
							$j1 = $_g3++;
							$h->text(" ");
							$h->input("text", "wirisassertionparam" . $unique . "[" . com_wiris_quizzes_Assertion::$checks[$i1] . "][" . $parameters[$j1] . "][" . $correctAnswer . "][0]", null, null, null, null);
							unset($j1);
						}
						unset($_g3,$_g2);
					}
					unset($j);
				}
				$h->close();
				unset($parameters,$i1);
			}
		}
		$h->close();
		$h->close();
		$h->close();
		$h->close();
	}
	public function printTester($h, $q, $qi, $correctAnswer, $unique) {
		if($q === null) {
			$q = new com_wiris_quizzes_Question();
		}
		if($qi === null) {
			$qi = new com_wiris_quizzes_QuestionInstance();
		}
		$hasUserAnswer = $qi->userData !== null && $qi->userData->answers !== null && $qi->userData->answers->length > 0;
		$h->openDivClass("wiristestwrapper" . $unique, "wiristestwrapper");
		$h->openDivClass("wiristestanswer" . $unique, "wiristestanswer wiriseditorwrapper");
		$content = null;
		if($hasUserAnswer) {
			$content = _hx_array_get($qi->userData->answers, 0)->content;
		} else {
			$content = "";
		}
		$this->printWirisEditor($h, null, "wiristestanswer" . $unique, $content, $unique);
		$h->close();
		$h->openDivClass("wiristestbuttons" . $unique, "wiristestbuttons");
		$h->input("button", "wiristestbutton" . $unique, null, $this->t->t("test"), null, "wirisbutton");
		$h->input("button", "wirisrestartbutton" . $unique, null, $this->t->t("start"), null, "wirisbutton");
		$h->close();
		$h->openDivClass("wiristestdynamic" . $unique, "wiristestdynamic");
		$h->raw($this->getWirisTestDynamic($q, $qi, $correctAnswer, $unique));
		$h->close();
		$h->close();
	}
	public function getWirisTestDynamic($q, $qi, $correctAnswer, $unique) {
		$h = new com_wiris_quizzes_HTML();
		$hasCorrectAnswer = $q->correctAnswers !== null && $correctAnswer < $q->correctAnswers->length;
		$h->openDivClass("wiristestresult" . $unique, "wiristestresult");
		$h->openFieldset("wiristestvalidationfieldset" . $unique, $this->t->t("validation"), "wirismainfieldset");
		if($qi->hasEvaluation()) {
			$h->openDivClass("wiristestgrade" . $unique, "wiristestgrade");
			if($qi->isAnswerMatching($correctAnswer, 0)) {
				$h->openSpan("wiristestgradetext" . $unique, "wiristestgradetext wiriscorrect");
				$h->text($this->t->t("correct"));
				$h->close();
			} else {
				$h->openSpan("wiristestgradetext" . $unique, "wiristestgradetext wirisincorrect");
				$h->text($this->t->t("incorrect"));
				$h->close();
			}
			$h->close();
			$h->openDivClass("wiristestassertions" . $unique, "wiristestassertions");
			$h->openDivClass("wiristestassertionslistwrapper" . $unique, "wiristestassertionslistwrapper");
			$h->openUl("wiristestassertionslist" . $unique, "wiristestassertionslist");
			$checks = $qi->getMatchingChecks($correctAnswer, 0);
			$j = null;
			{
				$_g1 = 0; $_g = $checks->length;
				while($_g1 < $_g) {
					$j1 = $_g1++;
					$h->openLi();
					$this->printAssertionFeedback($h, $checks[$j1], $q);
					$h->close();
					unset($j1);
				}
			}
			$h->close();
			$h->close();
			$h->close();
		} else {
			$h->text($this->t->t("clicktesttoevaluate"));
		}
		$h->close();
		$h->close();
		$h->openDivClass("wiristestcorrectanswer" . $unique . "[" . $correctAnswer . "]", "wiristestcorrectanswer");
		$h->openFieldset("wiristestcorrectanswerfieldset" . $unique, $this->t->t("correctanswer"), "wirismainfieldset");
		if($hasCorrectAnswer) {
			$content = _hx_array_get($q->correctAnswers, $correctAnswer)->content;
			if($qi->hasVariables()) {
				$content = $qi->expandVariables($content);
			}
			if(com_wiris_quizzes_MathContent::getMathType($content) === com_wiris_quizzes_MathContent::$TYPE_MATHML) {
				$this->printMathML($h, $content);
			} else {
				$h->text($content);
			}
		}
		$h->close();
		$h->close();
		return $h->getString();
	}
	public function printAssertionFeedback($h, $c, $q) {
		$h->openSpan(null, (($c->value) ? "wiriscorrect" : "wirisincorrect"));
		$feedback = $this->t->t($c->assertion . "_correct_feedback");
		$a = $q->assertions[$q->getAssertionIndex($c->assertion, $c->correctAnswer, $c->answer)];
		if($a->parameters !== null) {
			$i = null;
			{
				$_g1 = 0; $_g = $a->parameters->length;
				while($_g1 < $_g) {
					$i1 = $_g1++;
					$name = _hx_array_get($a->parameters, $i1)->name;
					$value = _hx_array_get($a->parameters, $i1)->content;
					$feedback = str_replace("\${" . $name . "}", $value, $feedback);
					unset($value,$name,$i1);
				}
			}
		}
		$h->text($feedback);
		$h->close();
	}
	public function printWirisEditor($h, $lang, $name, $content, $unique) {
		if($content !== null && strlen($content) > 0 && com_wiris_quizzes_MathContent::getMathType($content) === com_wiris_quizzes_MathContent::$TYPE_TEXT) {
			$tools = new com_wiris_quizzes_HTMLTools();
			$content = $tools->textToMathML($content);
		}
		$h->textarea($name, "", $content, "wiriseditor", $lang);
	}
	public function printWirisTextfield($h, $id, $index, $content, $unique, $conf) {
		$h->openSpan("wirismathinput" . $unique . "[" . $id . "][" . $index . "]", "wirismathinput");
		if($conf->tabCorrectAnswer) {
			if(com_wiris_quizzes_MathContent::isEmpty($content)) {
				$content = "";
			}
			$tools = new com_wiris_quizzes_HTMLTools();
			if(com_wiris_quizzes_MathContent::getMathType($content) === com_wiris_quizzes_MathContent::$TYPE_MATHML && $tools->isTokensMathML($content)) {
				$content = $tools->mathMLToText($content);
			}
			if(strlen($content) === 0 || com_wiris_quizzes_MathContent::getMathType($content) === com_wiris_quizzes_MathContent::$TYPE_TEXT) {
				$h->input("text", $id . $unique . "[" . $index . "]", "", $content, null, "wirismathtextinput " . $conf->getClasses());
			} else {
				$this->printMathML($h, $content);
				$h->input("hidden", $id . $unique . "[" . $index . "]", "", $content, null, $conf->getClasses());
			}
			$h->text(" ");
		} else {
			$h->input("hidden", $id . $unique . "[" . $index . "]", "", $content, null, $conf->getClasses());
		}
		$h->openA("wirispopuplink" . $unique . "[" . $id . "][" . $index . "]", "#", "wirispopuplink wirispopupeditanswer");
		$h->image("wiriseditoricon" . $unique, com_wiris_quizzes_QuizzesConfig::$QUIZZES_RESOURCES_URL . "/editor.gif", $this->t->t("edit"));
		$h->close();
		$h->close();
	}
	public function getLangFromCasSession($session) {
		$start = _hx_index_of($session, "<session", null);
		if($start === -1) {
			return null;
		}
		$end = _hx_index_of($session, ">", $start + 1);
		$start = _hx_index_of($session, "lang", $start);
		if($start === -1 || $start > $end) {
			return null;
		}
		$start = _hx_index_of($session, "\"", $start) + 1;
		return _hx_substr($session, $start, 2);
	}
	public function printLocalData($h, $q, $unique) {
		$h->openFieldset("wirislocaldatafieldset" . $unique, $this->t->t("inputmethod"), "wirismainfieldset");
		$h->help("wirisinputmethodhelp" . $unique, com_wiris_quizzes_QuizzesConfig::$QUIZZES_SERVICE_URL . "/assertions.xml?type=syntax", $this->t->t("manual"));
		$id = null;
		$h->openDivClass("wirisinputfielddiv" . $unique, "wirissecondaryfieldset");
		$h->openUl("wirisinputfieldul", "wirisul");
		$id = "wirislocaldata" . $unique . "[" . com_wiris_quizzes_LocalData::$KEY_OPENANSWER_INPUT_FIELD . "]";
		$h->openLi();
		$h->input("radio", $id . "[0]", $id, com_wiris_quizzes_LocalData::$VALUE_OPENANSWER_INPUT_FIELD_INLINE_EDITOR, null, null);
		$h->label($this->t->t("answerinputinlineeditor"), $id . "[0]", null);
		$h->close();
		$h->openLi();
		$h->input("radio", $id . "[1]", $id, com_wiris_quizzes_LocalData::$VALUE_OPENANSWER_INPUT_FIELD_POPUP_EDITOR, null, null);
		$h->label($this->t->t("answerinputpopupeditor"), $id . "[1]", null);
		$h->close();
		$h->openLi();
		$h->input("radio", $id . "[2]", $id, com_wiris_quizzes_LocalData::$VALUE_OPENANSWER_INPUT_FIELD_PLAIN_TEXT, null, null);
		$h->label($this->t->t("answerinputplaintext"), $id . "[2]", null);
		$h->close();
		$h->close();
		$h->close();
		$h->close();
	}
	public function printEditCasInitialContent($q) {
		$h = new com_wiris_quizzes_HTML();
		$h->openDivClass("wiriscontentwrapper", "wiriscasinitialcontent");
		$session = $q->getLocalData(com_wiris_quizzes_LocalData::$KEY_CAS_INITIAL_SESSION);
		$this->printWirisCas($h, $session, com_wiris_quizzes_HTMLGui::getNewId());
		$h->close();
		$this->printSubmitButtons($h, "");
		return $h->getString();
	}
	public function printMathML($h, $mathml) {
		$h->open("span", new _hx_array(array(new _hx_array(array("class", "mathml")))));
		$safeMathML = $this->encodeUnicodeChars($mathml);
		$src = com_wiris_quizzes_QuizzesConfig::$QUIZZES_PROXY_URL . "?service=render&mml=" . rawurlencode($safeMathML);
		$h->openclose("img", new _hx_array(array(new _hx_array(array("src", $src)), new _hx_array(array("align", "middle")))));
		$h->close();
	}
	public function encodeUnicodeChars($mathml) {
		$sb = new StringBuf();
		$i = null;
		{
			$_g1 = 0; $_g = strlen($mathml);
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$c = _hx_char_code_at($mathml, $i1);
				if($c > 127) {
					{
						$x = "&#";
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
						$x = $c;
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
						$x = ";";
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
				} else {
					$sb->b .= chr($c);
				}
				unset($i1,$c);
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
	static $id = 0;
	static function getNewId() {
		return com_wiris_quizzes_HTMLGui::$id++;
	}
	function __toString() { return 'com.wiris.quizzes.HTMLGui'; }
}
function com_wiris_quizzes_HTMLGui_0(&$»this, &$h, &$session, &$unique) {
	if($session !== null) {
		return $»this->getLangFromCasSession($session);
	} else {
		return $»this->lang;
	}
}
