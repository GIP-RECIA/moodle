<?php

class com_wiris_quizzes_HTMLTools {
	public function __construct() { 
	}
	public function extractVariableNames($html) {
		if($this->isMathMLEncoded($html)) {
			$html = $this->decodeMathML($html);
		}
		$html = $this->prepareFormulas($html);
		$names = new _hx_array(array());
		$start = 0;
		while(($start = _hx_index_of($html, "#", $start)) !== -1) {
			$name = $this->getVariableName($html, $start);
			if($name !== null) {
				$i = 0;
				while($i < $names->length) {
					if(com_wiris_quizzes_HTMLTools::compareStrings($names[$i], $name) >= 0) {
						break;
					}
					$i++;
				}
				if($i < $names->length) {
					if(!($names[$i] === $name)) {
						$names->insert($i, $name);
					}
				} else {
					$names->push($name);
				}
				unset($i);
			}
			$start++;
			unset($name);
		}
		$result = new _hx_array(array());
		$k = null;
		{
			$_g1 = 0; $_g = $names->length;
			while($_g1 < $_g) {
				$k1 = $_g1++;
				$result[$k1] = $names[$k1];
				unset($k1);
			}
		}
		return $result;
	}
	public function isMathMLEncoded($html) {
		$opentag = php_Utf8::uchr(171);
		return _hx_index_of($html, $opentag . "math", null) !== -1;
	}
	public function decodeMathML($html) {
		$opentag = "«";
		$closetag = "»";
		$quote = "¨";
		$amp = "§";
		$closemath = $opentag . "/math" . $closetag;
		$start = null;
		$end = 0;
		while(($start = _hx_index_of($html, $opentag . "math", $end)) !== -1) {
			$end = _hx_index_of($html, $closemath, $start) + strlen($closemath);
			$formula = _hx_substr($html, $start, $end - $start);
			$formula = com_wiris_util_xml_WXmlUtils::htmlUnescape($formula);
			$formula = str_replace($opentag, "<", $formula);
			$formula = str_replace($closetag, ">", $formula);
			$formula = str_replace($quote, "\"", $formula);
			$formula = str_replace($amp, "&", $formula);
			$html = _hx_substr($html, 0, $start) . $formula . _hx_substr($html, $end, null);
			$end = $start + strlen($formula);
			unset($formula);
		}
		return $html;
	}
	public function encodeMathML($html) {
		$opentag = "«";
		$closetag = "»";
		$quote = "¨";
		$amp = "§";
		$start = null;
		$end = 0;
		while(($start = _hx_index_of($html, "<math", $end)) !== -1) {
			$closemath = "</math>";
			$end = _hx_index_of($html, $closemath, $start) + strlen($closemath);
			$formula = _hx_substr($html, $start, $end - $start);
			$formula = str_replace("<", $opentag, $formula);
			$formula = str_replace(">", $closetag, $formula);
			$formula = str_replace("\"", $quote, $formula);
			$formula = str_replace("&", $amp, $formula);
			$html = _hx_substr($html, 0, $start) . $formula . _hx_substr($html, $end, null);
			$end = $start + strlen($formula);
			unset($formula,$closemath);
		}
		return $html;
	}
	public function expandVariables($html, $variables) {
		if($variables === null || _hx_index_of($html, "#", null) === -1) {
			return $html;
		}
		$encoded = $this->isMathMLEncoded($html);
		if($encoded) {
			$html = $this->decodeMathML($html);
		}
		$html = $this->prepareFormulas($html);
		$tokens = $this->splitHTMLbyMathML($html);
		$sb = new StringBuf();
		$i = null;
		{
			$_g1 = 0; $_g = $tokens->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$token = $tokens[$i1];
				$v = null;
				if(StringTools::startsWith($token, "<math")) {
					$v = $variables->get(com_wiris_quizzes_MathContent::$TYPE_MATHML);
					if($v !== null) {
						$token = $this->replaceMathMLVariablesInsideMathML($token, $v);
					}
				} else {
					$v = $variables->get(com_wiris_quizzes_MathContent::$TYPE_IMAGE);
					if($v !== null) {
						$token = $this->replaceVariablesInsideHTML($token, $v, com_wiris_quizzes_MathContent::$TYPE_IMAGE);
					}
					$v = $variables->get(com_wiris_quizzes_MathContent::$TYPE_MATHML);
					if($v !== null) {
						$token = $this->replaceVariablesInsideHTML($token, $v, com_wiris_quizzes_MathContent::$TYPE_MATHML);
					}
					$v = $variables->get(com_wiris_quizzes_MathContent::$TYPE_TEXT);
					if($v !== null) {
						$token = $this->replaceVariablesInsideHTML($token, $variables->get(com_wiris_quizzes_MathContent::$TYPE_TEXT), com_wiris_quizzes_MathContent::$TYPE_TEXT);
					}
				}
				{
					$x = $token;
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
				unset($v,$token,$i1);
			}
		}
		$result = $sb->b;
		if($encoded) {
			$result = $this->encodeMathML($result);
		}
		return $result;
	}
	public function splitHTMLbyMathML($html) {
		$tokens = new _hx_array(array());
		$start = 0;
		$end = 0;
		while(($start = _hx_index_of($html, "<math", $end)) !== -1) {
			if($start - $end > 0) {
				$tokens->push(_hx_substr($html, $end, $start - $end));
			}
			$firstClose = _hx_index_of($html, ">", $start);
			if($firstClose !== -1 && _hx_substr($html, $firstClose - 1, 1) === "/") {
				$end = $firstClose + 1;
			} else {
				$end = _hx_index_of($html, "</math>", $start) + strlen("</math>");
			}
			$tokens->push(_hx_substr($html, $start, $end - $start));
			unset($firstClose);
		}
		if($end < strlen($html)) {
			$tokens->push(_hx_substr($html, $end, null));
		}
		return $tokens;
	}
	public function replaceMathMLVariablesInsideMathML($formula, $variables) {
		$keys = $this->sortIterator($variables->keys());
		$j = $keys->length - 1;
		while($j >= 0) {
			$name = $keys[$j];
			$placeholder = $this->getPlaceHolder($name);
			$pos = null;
			while(($pos = _hx_index_of($formula, $placeholder, null)) !== -1) {
				$value = $this->toSubFormula($variables->get($name));
				$splittag = false;
				$formula1 = _hx_substr($formula, 0, $pos);
				$formula2 = _hx_substr($formula, $pos + strlen($placeholder), null);
				$openTag1 = _hx_last_index_of($formula1, "<", null);
				$closeTag1 = _hx_last_index_of($formula1, ">", null);
				$openTag2 = _hx_index_of($formula2, "<", null);
				$closeTag2 = _hx_index_of($formula2, ">", null);
				$after = "";
				$before = "";
				if($closeTag1 + 1 < strlen($formula1)) {
					$splittag = true;
					$closeTag = _hx_substr($formula2, $openTag2, $closeTag2 - $openTag2 + 1);
					$before = _hx_substr($formula1, $openTag1, null) . $closeTag;
					unset($closeTag);
				}
				if($openTag2 > 0) {
					$splittag = true;
					$openTag = _hx_substr($formula1, $openTag1, $closeTag1 - $openTag1 + 1);
					$after = $openTag . _hx_substr($formula2, 0, $openTag2 + 1);
					unset($openTag);
				}
				$formula1 = _hx_substr($formula1, 0, $openTag1);
				$formula2 = _hx_substr($formula2, $closeTag2 + 1, null);
				if($splittag) {
					$formula = $formula1 . "<mrow>" . $before . $value . $after . "</mrow>" . $formula2;
				} else {
					$formula = $formula1 . $value . $formula2;
				}
				unset($value,$splittag,$openTag2,$openTag1,$formula2,$formula1,$closeTag2,$closeTag1,$before,$after);
			}
			$j--;
			unset($pos,$placeholder,$name);
		}
		return $formula;
	}
	public function replaceVariablesInsideHTML($token, $variables, $type) {
		$keys = $this->sortIterator($variables->keys());
		$j = $keys->length - 1;
		while($j >= 0) {
			$name = $keys[$j];
			$placeholder = $this->getPlaceHolder($name);
			$pos = 0;
			while(($pos = _hx_index_of($token, $placeholder, $pos)) !== -1) {
				if((!($type === com_wiris_quizzes_MathContent::$TYPE_MATHML) || !$this->insideTag($token, $pos)) && $name === $this->getVariableName($token, $pos)) {
					$value = $variables->get($name);
					if($type === com_wiris_quizzes_MathContent::$TYPE_TEXT) {
						$value = com_wiris_util_xml_WXmlUtils::htmlEscape($value);
					} else {
						if($type === com_wiris_quizzes_MathContent::$TYPE_MATHML) {
							$value = $this->addMathTag($value);
							$value = $this->extractTextFromMathML($value);
						} else {
							if($type === com_wiris_quizzes_MathContent::$TYPE_IMAGE) {
								$value = $this->addImageTag($value);
							}
						}
					}
					$token = _hx_substr($token, 0, $pos) . $value . _hx_substr($token, $pos + strlen($placeholder), null);
					unset($value);
				}
				$pos++;
			}
			$j--;
			unset($pos,$placeholder,$name);
		}
		return $token;
	}
	public function getVariableName($html, $pos) {
		$name = null;
		if(_hx_char_code_at($html, $pos) === 35) {
			$end = $pos + 1;
			if($end < strlen($html)) {
				$c = _hx_char_code_at($html, $end);
				if($this->isQuizzesIdentifierStart($c)) {
					$end++;
					while($end < strlen($html) && $this->isQuizzesIdentifierPart(_hx_char_code_at($html, $end))) {
						$end++;
					}
					$name = _hx_substr($html, $pos + 1, $end - ($pos + 1));
				}
			}
		}
		return $name;
	}
	public function isQuizzesIdentifierStart($c) {
		return $c >= 97 && $c <= 122 || $c >= 65 && $c <= 90 || $c === 95;
	}
	public function isQuizzesIdentifierPart($c) {
		return $c >= 97 && $c <= 122 || $c >= 65 && $c <= 90 || $c === 95 || $c >= 48 && $c <= 57;
	}
	public function insideTag($html, $pos) {
		$beginTag = _hx_last_index_of($html, "<", $pos);
		$endTag = _hx_last_index_of($html, ">", $pos);
		return $beginTag !== -1 && $endTag === -1 || $beginTag > $endTag;
	}
	public function getPlaceHolder($name) {
		return "#" . $name;
	}
	public function sortIterator($it) {
		$sorted = new _hx_array(array());
		while($it->hasNext()) {
			$a = $it->next();
			$j = 0;
			{
				$_g1 = 0; $_g = $sorted->length;
				while($_g1 < $_g) {
					$j1 = $_g1++;
					if(com_wiris_quizzes_HTMLTools::compareStrings($sorted[$j1], $a) > 0) {
						break;
					}
					unset($j1);
				}
				unset($_g1,$_g);
			}
			$sorted->insert($j, $a);
			unset($j,$a);
		}
		return $sorted;
	}
	public function prepareFormulas($text) {
		$start = 0;
		while(($start = _hx_index_of($text, "<math", $start)) !== -1) {
			$length = _hx_index_of($text, "</math>", $start) - $start + strlen("</math>");
			$formula = _hx_substr($text, $start, $length);
			$pos = 0;
			while(($pos = _hx_index_of($formula, "#", $pos)) !== -1) {
				$initag = $pos;
				while($initag >= 0 && _hx_char_code_at($formula, $initag) !== 60) {
					$initag--;
				}
				$parentpos = $initag;
				$parenttag = null;
				$parenttagname = null;
				while($parenttag === null) {
					while(_hx_char_code_at($formula, $parentpos - 2) === 47 && _hx_char_code_at($formula, $parentpos - 1) === 62) {
						while($parentpos >= 0 && _hx_char_code_at($formula, $parentpos) !== 60) {
							$parentpos--;
						}
					}
					$parentpos--;
					while($parentpos >= 0 && _hx_char_code_at($formula, $parentpos) !== 60) {
						$parentpos--;
					}
					if(_hx_char_code_at($formula, $parentpos) === 60 && _hx_char_code_at($formula, $parentpos + 1) === 47) {
						$namepos = $parentpos + strlen("</");
						$character = _hx_char_code_at($formula, $namepos);
						$nameBuf = new StringBuf();
						while($this->isQuizzesIdentifierPart($character)) {
							$nameBuf->b .= chr($character);
							$namepos++;
							$character = _hx_char_code_at($formula, $namepos);
						}
						$name = $nameBuf->b;
						$depth = 1;
						$namelength = strlen($name);
						while($depth > 0 && $parentpos >= 0) {
							$currentTagName = _hx_substr($formula, $parentpos, $namelength);
							if($name === $currentTagName) {
								$currentStartTag = _hx_substr($formula, $parentpos - strlen("<"), $namelength + strlen("<"));
								if("<" . $name === $currentStartTag && _hx_index_of($formula, ">", $parentpos) < _hx_index_of($formula, "/", $parentpos)) {
									$depth--;
								} else {
									$currentOpenCloseTag = _hx_substr($formula, $parentpos - strlen("</"), $namelength + strlen("</"));
									if("</" . $name === $currentOpenCloseTag) {
										$depth++;
									}
									unset($currentOpenCloseTag);
								}
								unset($currentStartTag);
							}
							if($depth > 0) {
								$parentpos--;
							} else {
								$parentpos -= strlen("<");
							}
							unset($currentTagName);
						}
						if($depth > 0) {
							return $text;
						}
						unset($namepos,$namelength,$nameBuf,$name,$depth,$character);
					} else {
						$parenttag = _hx_substr($formula, $parentpos, _hx_index_of($formula, ">", $parentpos) - $parentpos + 1);
						$parenttagname = _hx_substr($parenttag, 1, strlen($parenttag) - 2);
						if(_hx_index_of($parenttagname, " ", null) !== -1) {
							$parenttagname = _hx_substr($parenttagname, 0, _hx_index_of($parenttagname, " ", null));
						}
					}
				}
				$allowedparenttags = new _hx_array(array("mrow", "mtd", "math", "msqrt", "mstyle", "merror", "mpadded", "mphantom", "menclose"));
				if($this->inArray($parenttagname, $allowedparenttags)) {
					$firstchar = true;
					$appendpos = $pos + 1;
					$character = _hx_char_code_at($formula, $appendpos);
					while($this->isQuizzesIdentifierStart($character) || $this->isQuizzesIdentifierPart($character) && !$firstchar) {
						$appendpos++;
						$character = _hx_char_code_at($formula, $appendpos);
						$firstchar = false;
					}
					if(_hx_char_code_at($formula, $appendpos) !== 60) {
						$pos++;
						continue;
					}
					$nextpos = _hx_index_of($formula, ">", $pos);
					$end = false;
					while(!$end && $nextpos !== -1 && $pos + strlen(">") < strlen($formula)) {
						$nextpos += strlen(">");
						$nexttaglength = _hx_index_of($formula, ">", $nextpos) - $nextpos + strlen(">");
						$nexttag = _hx_substr($formula, $nextpos, $nexttaglength);
						$nexttagname = _hx_substr($nexttag, 1, strlen($nexttag) - 2);
						if(_hx_index_of($nexttagname, " ", null) !== -1) {
							$nexttagname = _hx_substr($nexttagname, 0, _hx_index_of($nexttagname, " ", null));
						}
						$specialtag = null;
						$speciallength = 0;
						if($nexttagname === "msup" || $nexttagname === "msub" || $nexttagname === "msubsup") {
							$specialtag = $nexttag;
							$speciallength = $nexttaglength;
							$nextpos = $nextpos + $nexttaglength;
							$nexttaglength = _hx_index_of($formula, ">", $nextpos) - $nextpos + strlen(">");
							$nexttag = _hx_substr($formula, $nextpos, $nexttaglength);
							$nexttagname = _hx_substr($nexttag, 1, strlen($nexttag) - 2);
							if(_hx_index_of($nexttagname, " ", null) !== -1) {
								$nexttagname = _hx_substr($nexttagname, 0, _hx_index_of($nexttagname, " ", null));
							}
						}
						if($nexttagname === "mi" || $nexttagname === "mn") {
							$contentpos = $nextpos + $nexttaglength;
							$toappend = new StringBuf();
							$character = _hx_char_code_at($formula, $contentpos);
							while($this->isQuizzesIdentifierStart($character) || $this->isQuizzesIdentifierPart($character) && !$firstchar) {
								$contentpos++;
								$toappend->b .= chr($character);
								$character = _hx_char_code_at($formula, $contentpos);
								$firstchar = false;
							}
							$toAppendStr = $toappend->b;
							$nextclosepos = _hx_index_of($formula, "<", $contentpos);
							$nextcloseend = _hx_index_of($formula, ">", $nextclosepos) + strlen(">");
							if(strlen($toAppendStr) === 0) {
								$end = true;
							} else {
								if($nextclosepos !== $contentpos) {
									$content = _hx_substr($formula, $contentpos, $nextclosepos - $contentpos);
									$nextclosetag = _hx_substr($formula, $nextclosepos, $nextcloseend - $nextclosepos);
									$newnexttag = $nexttag . $content . $nextclosetag;
									$formula = _hx_substr($formula, 0, $nextpos) . $newnexttag . _hx_substr($formula, $nextcloseend, null);
									$formula = _hx_substr($formula, 0, $appendpos) . $toAppendStr . _hx_substr($formula, $appendpos, null);
									$end = true;
									unset($nextclosetag,$newnexttag,$content);
								} else {
									$formula = _hx_substr($formula, 0, $nextpos) . _hx_substr($formula, $nextcloseend, null);
									$formula = _hx_substr($formula, 0, $appendpos) . $toAppendStr . _hx_substr($formula, $appendpos, null);
									if($specialtag !== null) {
										$fulltaglength = _hx_index_of($formula, ">", $appendpos) + strlen(">") - $initag;
										$formula = _hx_substr($formula, 0, $initag) . $specialtag . _hx_substr($formula, $initag, $fulltaglength) . _hx_substr($formula, $initag + $fulltaglength + $speciallength, null);
										$end = true;
										unset($fulltaglength);
									}
								}
							}
							$appendpos += strlen($toAppendStr);
							unset($toappend,$toAppendStr,$nextclosepos,$nextcloseend,$contentpos);
						} else {
							$end = true;
						}
						if(!$end) {
							$nextpos = _hx_index_of($formula, ">", $pos);
						}
						unset($specialtag,$speciallength,$nexttagname,$nexttaglength,$nexttag);
					}
					unset($nextpos,$firstchar,$end,$character,$appendpos);
				}
				$pos++;
				unset($parenttagname,$parenttag,$parentpos,$initag,$allowedparenttags);
			}
			$text = _hx_substr($text, 0, $start) . $formula . _hx_substr($text, $start + $length, null);
			$start = $start + strlen($formula);
			unset($pos,$length,$formula);
		}
		return $text;
	}
	public function inArray($value, $array) {
		$i = null;
		{
			$_g1 = 0; $_g = $array->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				if($array[$i1] === $value) {
					return true;
				}
				unset($i1);
			}
		}
		return false;
	}
	public function addMathTag($mathml) {
		if(!StringTools::startsWith($mathml, "<math")) {
			$mathml = "<math xmlns=\"http://www.w3.org/1998/Math/MathML\">" . $mathml . "</math>";
		}
		return $mathml;
	}
	public function stripMathTag($mathml) {
		$mathml = trim($mathml);
		if(StringTools::startsWith($mathml, "<math")) {
			$mathml = _hx_substr($mathml, _hx_index_of($mathml, ">", null) + 1, null);
			$mathml = _hx_substr($mathml, 0, _hx_last_index_of($mathml, "<", null));
		}
		return $mathml;
	}
	public function toSubFormula($mathml) {
		$mathml = $this->stripMathTag($mathml);
		return "<mrow>" . $mathml . "</mrow>";
	}
	public function isReservedWord($word) {
		$reservedWords = new _hx_array(array("sin", "cos", "tan", "log", "ln"));
		return $this->inArray($word, $reservedWords);
	}
	public function textToMathML($text) {
		$mathml = new StringBuf();
		$token = null;
		$n = php_Utf8::length($text);
		$i = 0;
		while($i < $n) {
			$c = php_Utf8::charCodeAt($text, $i);
			if($c === 32) {
				$i++;
				if($i < $n) {
					$c = php_Utf8::charCodeAt($text, $i);
				}
			} else {
				if(com_wiris_quizzes_HTMLTools::isDigit($c)) {
					$token = new StringBuf();
					while($i < $n && com_wiris_quizzes_HTMLTools::isDigit($c)) {
						$token->b .= chr($c);
						$i++;
						if($i < $n) {
							$c = php_Utf8::charCodeAt($text, $i);
						}
					}
					{
						$x = "<mn>";
						if(is_null($x)) {
							$x = "null";
						} else {
							if(is_bool($x)) {
								$x = (($x) ? "true" : "false");
							}
						}
						$mathml->b .= $x;
						unset($x);
					}
					{
						$x = $token->b;
						if(is_null($x)) {
							$x = "null";
						} else {
							if(is_bool($x)) {
								$x = (($x) ? "true" : "false");
							}
						}
						$mathml->b .= $x;
						unset($x);
					}
					{
						$x = "</mn>";
						if(is_null($x)) {
							$x = "null";
						} else {
							if(is_bool($x)) {
								$x = (($x) ? "true" : "false");
							}
						}
						$mathml->b .= $x;
						unset($x);
					}
				} else {
					if(com_wiris_quizzes_HTMLTools::isLetter($c)) {
						$token = new StringBuf();
						while($i < $n && com_wiris_quizzes_HTMLTools::isLetter($c)) {
							{
								$x = php_Utf8::uchr($c);
								if(is_null($x)) {
									$x = "null";
								} else {
									if(is_bool($x)) {
										$x = (($x) ? "true" : "false");
									}
								}
								$token->b .= $x;
								unset($x);
							}
							$i++;
							if($i < $n) {
								$c = php_Utf8::charCodeAt($text, $i);
							}
						}
						$tok = $token->b;
						$tokens = null;
						if($this->isReservedWord($tok)) {
							$tokens = new _hx_array(array($tok));
						} else {
							$m = php_Utf8::length($tok);
							$tokens = new _hx_array(array());
							$j = null;
							{
								$_g = 0;
								while($_g < $m) {
									$j1 = $_g++;
									$tokens[$j1] = php_Utf8::uchr(php_Utf8::charCodeAt($tok, $j1));
									unset($j1);
								}
								unset($_g);
							}
							unset($m,$j);
						}
						$k = null;
						{
							$_g1 = 0; $_g = $tokens->length;
							while($_g1 < $_g) {
								$k1 = $_g1++;
								{
									$x = "<mi>";
									if(is_null($x)) {
										$x = "null";
									} else {
										if(is_bool($x)) {
											$x = (($x) ? "true" : "false");
										}
									}
									$mathml->b .= $x;
									unset($x);
								}
								{
									$x = $tokens[$k1];
									if(is_null($x)) {
										$x = "null";
									} else {
										if(is_bool($x)) {
											$x = (($x) ? "true" : "false");
										}
									}
									$mathml->b .= $x;
									unset($x);
								}
								{
									$x = "</mi>";
									if(is_null($x)) {
										$x = "null";
									} else {
										if(is_bool($x)) {
											$x = (($x) ? "true" : "false");
										}
									}
									$mathml->b .= $x;
									unset($x);
								}
								unset($k1);
							}
							unset($_g1,$_g);
						}
						unset($tokens,$tok,$k);
					} else {
						{
							$x = "<mo>";
							if(is_null($x)) {
								$x = "null";
							} else {
								if(is_bool($x)) {
									$x = (($x) ? "true" : "false");
								}
							}
							$mathml->b .= $x;
							unset($x);
						}
						{
							$x = php_Utf8::uchr($c);
							if(is_null($x)) {
								$x = "null";
							} else {
								if(is_bool($x)) {
									$x = (($x) ? "true" : "false");
								}
							}
							$mathml->b .= $x;
							unset($x);
						}
						{
							$x = "</mo>";
							if(is_null($x)) {
								$x = "null";
							} else {
								if(is_bool($x)) {
									$x = (($x) ? "true" : "false");
								}
							}
							$mathml->b .= $x;
							unset($x);
						}
						$i++;
						if($i < $n) {
							$c = php_Utf8::charCodeAt($text, $i);
						}
					}
				}
			}
			unset($c);
		}
		$result = $this->addMathTag($mathml->b);
		return $result;
	}
	public function isTokensMathML($mathml) {
		$mathml = $this->stripMathTag($mathml);
		$allowedTags = new _hx_array(array("mrow", "mn", "mi", "mo"));
		$start = 0;
		while(($start = _hx_index_of($mathml, "<", $start)) !== -1) {
			$sb = new StringBuf();
			$start++;
			$c = _hx_char_code_at($mathml, $start);
			if($c === 47) {
				continue;
			}
			while($c !== 32 && $c !== 47 && $c !== 62) {
				$sb->b .= chr($c);
				$start++;
				$c = _hx_char_code_at($mathml, $start);
			}
			if($c === 32 && $c === 47) {
				return false;
			}
			$tagname = $sb->b;
			if(!$this->inArray($tagname, $allowedTags)) {
				return false;
			}
			if($tagname === "mo") {
				$start++;
				$end = _hx_index_of($mathml, "<", $start);
				$content = _hx_substr($mathml, $start, $end - $start);
				if(!($content === "#")) {
					return false;
				}
				unset($end,$content);
			}
			unset($tagname,$sb,$c);
		}
		return true;
	}
	public function mathMLToText($mathml) {
		$text = new StringBuf();
		$mathml = $this->stripMathTag($mathml);
		$tags = new _hx_array(array("mi", "mo", "mn"));
		$start = 0;
		$lastMi = false;
		$lastReserved = false;
		while(($start = _hx_index_of($mathml, "<", $start)) !== -1) {
			$start++;
			$end = _hx_index_of($mathml, ">", $start);
			if($end === -1) {
				break;
			}
			$tag = _hx_substr($mathml, $start, $end - $start);
			$space = null;
			if(($space = _hx_index_of($tag, " ", null)) !== -1) {
				$tag = _hx_substr($tag, 0, $space);
			}
			if(!$this->inArray($tag, $tags)) {
				continue;
			}
			$start = $end + 1;
			$end = _hx_index_of($mathml, "<", $start);
			if($end - $start <= 0) {
				continue;
			}
			$content = _hx_substr($mathml, $start, $end - $start);
			$mi = $tag === "mi";
			$reserved = $mi && $this->isReservedWord($content);
			if($mi && $lastReserved || $lastMi && $reserved) {
				$x = " ";
				if(is_null($x)) {
					$x = "null";
				} else {
					if(is_bool($x)) {
						$x = (($x) ? "true" : "false");
					}
				}
				$text->b .= $x;
				unset($x);
			}
			{
				$x = $content;
				if(is_null($x)) {
					$x = "null";
				} else {
					if(is_bool($x)) {
						$x = (($x) ? "true" : "false");
					}
				}
				$text->b .= $x;
				unset($x);
			}
			$lastMi = $mi;
			$lastReserved = $reserved;
			unset($tag,$space,$reserved,$mi,$end,$content);
		}
		return $text->b;
	}
	public function addImageTag($value) {
		$base64 = $this->getBase64Code();
		$value = str_replace("=", "", $value);
		$b = $base64->decodeBytes(haxe_io_Bytes::ofString($value));
		$filename = haxe_Md5::encode($value);
		$path = com_wiris_quizzes_QuizzesConfig::$QUIZZES_CACHE_PATH . "/" . $filename . ".png";
		$s = com_wiris_system_Storage::newStorage($path);
		if(!$s->exists()) {
			$s->writeBinary($b->b);
		}
		$url = com_wiris_quizzes_QuizzesConfig::$QUIZZES_PROXY_URL . "?service=cache&name=" . $filename . ".png";
		$h = new com_wiris_quizzes_HTML();
		$h->image($filename, $url, null);
		return $h->getString();
	}
	public function getBase64Code() {
		if(com_wiris_quizzes_HTMLTools::$base64 === null) {
			com_wiris_quizzes_HTMLTools::$base64 = new haxe_BaseCode(haxe_io_Bytes::ofString("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"));
		}
		return com_wiris_quizzes_HTMLTools::$base64;
	}
	public function extractTextFromMathML($formula) {
		if(_hx_index_of($formula, "<mtext", null) === -1) {
			return $formula;
		}
		$allowedTags = new _hx_array(array("math", "mrow"));
		$stack = new _hx_array(array());
		$omittedcontent = false;
		$lasttag = null;
		$beginformula = _hx_index_of($formula, "<", null);
		$start = null;
		$end = 0;
		while($end < strlen($formula) && ($start = _hx_index_of($formula, "<", $end)) !== -1) {
			$end = _hx_index_of($formula, ">", $start);
			$tag = _hx_substr($formula, $start, $end - $start + 1);
			$trimmedTag = _hx_substr($formula, $start + 1, $end - $start - 1);
			if(_hx_substr($trimmedTag, strlen($trimmedTag) - 1, null) === "/") {
				continue;
			}
			$spacepos = _hx_index_of($tag, " ", null);
			if($spacepos !== -1) {
				$trimmedTag = _hx_substr($tag, 1, $spacepos - 1);
			}
			if($this->inArray($trimmedTag, $allowedTags)) {
				$stack->push(new _hx_array(array($trimmedTag, $tag)));
				$lasttag = $trimmedTag;
			} else {
				if($trimmedTag === "/" . $lasttag) {
					$stack->pop();
					if($stack->length > 0) {
						$lastpair = $stack[$stack->length - 1];
						$lasttag = $lastpair[0];
						unset($lastpair);
					} else {
						$lasttag = null;
					}
					if($stack->length === 0 && !$omittedcontent) {
						$formula1 = _hx_substr($formula, 0, $beginformula);
						if($end < strlen($formula) - 1) {
							$formula2 = _hx_substr($formula, $end + 1, null);
							$formula = $formula1 . $formula2;
							unset($formula2);
						} else {
							$formula = $formula1;
						}
						unset($formula1);
					}
				} else {
					if($trimmedTag === "mtext") {
						$pos2 = _hx_index_of($formula, "</mtext>", $start);
						$text = _hx_substr($formula, $start + 7, $pos2 - $start - 7);
						$text = str_replace("&centerdot;", "&middot;", $text);
						$text = str_replace("&apos;", "&#39;", $text);
						$formula1 = _hx_substr($formula, 0, $start);
						$formula2 = _hx_substr($formula, $pos2 + 8, null);
						if($omittedcontent) {
							$tail1 = "";
							$head2 = "";
							$i = $stack->length - 1;
							while($i >= 0) {
								$pair = $stack[$i];
								$tail1 = $tail1 . "</" . $pair[0] . ">";
								$head2 = $pair[1] . $head2;
								$i--;
								unset($pair);
							}
							$formula1 = $formula1 . $tail1;
							$formula2 = $head2 . $formula2;
							if(com_wiris_quizzes_MathContent::isEmpty($formula2)) {
								$formula2 = "";
							}
							$formula = $formula1 . $text . $formula2;
							$beginformula = $start + strlen($tail1) + strlen($text);
							$end = $beginformula + strlen($head2);
							unset($tail1,$i,$head2);
						} else {
							$head = _hx_substr($formula1, 0, $beginformula);
							$head2 = _hx_substr($formula1, $beginformula, null);
							$formula2 = $head2 . $formula2;
							if(com_wiris_quizzes_MathContent::isEmpty($formula2)) {
								$formula2 = "";
							}
							$formula = $head . $text . $formula2;
							$beginformula += strlen($text);
							$end = $beginformula + strlen($formula1);
							unset($head2,$head);
						}
						$omittedcontent = false;
						unset($text,$pos2,$formula2,$formula1);
					} else {
						$num = 1;
						$pos = $start + strlen($tag);
						while($num > 0) {
							$end = _hx_index_of($formula, "</" . $trimmedTag . ">", $pos);
							$mid = _hx_index_of($formula, "<" . $trimmedTag, $pos);
							if($end === -1) {
								return $formula;
							} else {
								if($mid === -1 || $end < $mid) {
									$num--;
									$pos = $end + strlen(("</" . $trimmedTag . ">"));
								} else {
									$pos = $mid + strlen(("<" . $trimmedTag));
									$num++;
								}
							}
							unset($mid);
						}
						$end += strlen(("</" . $trimmedTag . ">"));
						$omittedcontent = true;
						unset($pos,$num);
					}
				}
			}
			unset($trimmedTag,$tag,$spacepos);
		}
		return $formula;
	}
	public function unitTestPrepareFormulasAlgorithm() {
		$tests = new _hx_array(array("<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mo>#</mo><mi>a</mi><mo>&#160;</mo><mo>+</mo><mo>#</mo><mi>b</mi></math>", "<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi>p</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>#</mi><mi>p</mi></math>", "<math><mrow><mi>#</mi><mi>f</mi></mrow></math>", "<math><mrow><mi>#</mi><msup><mi>f</mi><mn>2</mn></msup></mrow></math>", "<math><mrow><msqrt><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></msqrt><mi>#</mi><mi>a</mi></mrow></math>", "<math><mrow><msub><mi>#</mi><mi>a</mi></msub></mrow></math>", "<math><mrow><mi>#</mi><msub><mi>a</mi><mi>c</mi></msub></mrow></math>", "<math><mrow><msqrt><mrow><mi>#</mi><mi>f</mi><mi>u</mi><mi>n</mi><mi>c</mi></mrow></msqrt></mrow></math>", "<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mo>&#8594;</mo><mn>0</mn></math>"));
		$responses = new _hx_array(array("<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mo>#a</mo><mo>&#160;</mo><mo>+</mo><mo>#b</mo></math>", "<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi>p</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>#p</mi></math>", "<math><mrow><mi>#f</mi></mrow></math>", "<math><mrow><msup><mi>#f</mi><mn>2</mn></msup></mrow></math>", "<math><mrow><msqrt><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></msqrt><mi>#a</mi></mrow></math>", "<math><mrow><msub><mi>#</mi><mi>a</mi></msub></mrow></math>", "<math><mrow><msub><mi>#a</mi><mi>c</mi></msub></mrow></math>", "<math><mrow><msqrt><mrow><mi>#func</mi></mrow></msqrt></mrow></math>", "<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mo>&#8594;</mo><mn>0</mn></math>"));
		$i = null;
		{
			$_g1 = 0; $_g = $tests->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$res = $this->prepareFormulas($tests[$i1]);
				if(!($res === $responses[$i1])) {
					throw new HException("Expected: '" . $responses[$i1] . "' but got: '" . $res . "'.");
				}
				unset($res,$i1);
			}
		}
	}
	public function unitTestExtractText() {
		$inputs = new _hx_array(array("<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><mtext>Cap de les altres</mtext></mrow></math>", "<math><mrow><mtext>La resposta és </mtext><mfrac><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>x</mi></mfrac><mtext>.</mtext></mrow></math>", "<math><mrow><mo>(</mo><mtext>tiruliru</mtext><mo>)</mo></mrow></math>", "<math><mrow><msqrt><mtext>radicand</mtext></msqrt></mrow></math>"));
		$outputs = new _hx_array(array("Cap de les altres", "La resposta és <math><mrow><mfrac><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>x</mi></mfrac></mrow></math>.", "<math><mrow><mo>(</mo></mrow></math>tiruliru<math><mrow><mo>)</mo></mrow></math>", "<math><mrow><msqrt><mtext>radicand</mtext></msqrt></mrow></math>"));
		$i = null;
		{
			$_g1 = 0; $_g = $inputs->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$coutput = $this->extractTextFromMathML($inputs[$i1]);
				if(!($coutput === $outputs[$i1])) {
					throw new HException("Expected: '" . $outputs[$i1] . "' but got: '" . $coutput . "'.");
				}
				unset($i1,$coutput);
			}
		}
	}
	public function unitTestReplaceVariablesInHTML() {
		$texts = new _hx_array(array("<p><img align=\"middle\" src=\"http://localhost/moodle21/lib/editor/tinymce/tiny_mce/3.4.2/plugins/tiny_mce_wiris/integration/showimage.php?formula=cb550f21cbc30fac59e4f2bba550693d.png\" /> + #dif</p>", "a  «math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;»«mfrac»«mrow»«mi»#«/mi»«mi»a«/mi»«mo»+«/mo»«mn»1«/mn»«/mrow»«mrow»«mi»#«/mi»«mi»b«/mi»«mo»-«/mo»«mn»1«/mn»«/mrow»«/mfrac»«/math» a", "<math><mo>#</mo><mi>a</mi></math>"));
		$mml = new Hash();
		$mml->set("dif", "<math><mn>0</mn></math>");
		$mml->set("a", "<math><mi>x</mi></math>");
		$mml->set("b", "<math><mi>y</mi></math>");
		$v = new Hash();
		$v->set(com_wiris_quizzes_MathContent::$TYPE_MATHML, $mml);
		$responses = new _hx_array(array("<p><img align=\"middle\" src=\"http://localhost/moodle21/lib/editor/tinymce/tiny_mce/3.4.2/plugins/tiny_mce_wiris/integration/showimage.php?formula=cb550f21cbc30fac59e4f2bba550693d.png\" /> + <math><mn>0</mn></math></p>", "a  «math xmlns=¨http://www.w3.org/1998/Math/MathML¨»«mfrac»«mrow»«mrow»«mi»x«/mi»«/mrow»«mo»+«/mo»«mn»1«/mn»«/mrow»«mrow»«mrow»«mi»y«/mi»«/mrow»«mo»-«/mo»«mn»1«/mn»«/mrow»«/mfrac»«/math» a", "<math><mrow><mi>x</mi></mrow></math>"));
		$i = null;
		{
			$_g1 = 0; $_g = $texts->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$res = $this->expandVariables($texts[$i1], $v);
				if(!($res === $responses[$i1])) {
					throw new HException("Expected: '" . $responses[$i1] . "' but got: '" . $res . "'.");
				}
				unset($res,$i1);
			}
		}
	}
	public function unitTestTextToMathML() {
		$texts = new _hx_array(array("sin(x)+1", "#F +C", "2.0·xy"));
		$responses = new _hx_array(array("<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mn>1</mn></math>", "<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mo>#</mo><mi>F</mi><mo>+</mo><mi>C</mi></math>", "<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mn>2</mn><mo>.</mo><mn>0</mn><mo>·</mo><mi>x</mi><mi>y</mi></math>"));
		$i = null;
		{
			$_g1 = 0; $_g = $texts->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$res = $this->textToMathML($texts[$i1]);
				if(!($res === $responses[$i1])) {
					throw new HException("Expected: '" . $responses[$i1] . "' but got: '" . $res . "'.");
				}
				unset($res,$i1);
			}
		}
	}
	public function unitTestMathMLToText() {
		$mathml = new _hx_array(array("<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mn>1</mn></math>", "<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mo>#</mo><mi>F</mi><mo>+</mo><mi>C</mi></math>", "<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mn>2</mn><mo>.</mo><mn>0</mn><mo>·</mo><mi>x</mi><mi>y</mi></math>", "<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi mathvariant=\"normal\">sin</mi><mi>x</mi></math>"));
		$responses = new _hx_array(array("sin(x)+1", "#F+C", "2.0·xy", "sin x"));
		$i = null;
		{
			$_g1 = 0; $_g = $mathml->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$res = $this->mathMLToText($mathml[$i1]);
				if(!($res === $responses[$i1])) {
					throw new HException("Expected: '" . $responses[$i1] . "' but got: '" . $res . "'.");
				}
				unset($res,$i1);
			}
		}
	}
	public function unitTest() {
		$this->unitTestExtractText();
		$this->unitTestTextToMathML();
		$this->unitTestReplaceVariablesInHTML();
		$this->unitTestPrepareFormulasAlgorithm();
		$this->unitTestMathMLToText();
	}
	static $base64;
	static function compareStrings($a, $b) {
		$i = null;
		$n = com_wiris_quizzes_HTMLTools_0($a, $b, $i);
		{
			$_g = 0;
			while($_g < $n) {
				$i1 = $_g++;
				$c = _hx_char_code_at($a, $i1) - _hx_char_code_at($b, $i1);
				if($c !== 0) {
					return $c;
				}
				unset($i1,$c);
			}
		}
		return strlen($a) - strlen($b);
	}
	static function isDigit($c) {
		if(48 <= $c && $c <= 57) {
			return true;
		}
		if(1632 <= $c && $c <= 1641) {
			return true;
		}
		if(1776 <= $c && $c <= 1785) {
			return true;
		}
		return false;
	}
	static function isLetter($c) {
		if(com_wiris_quizzes_HTMLTools::isDigit($c)) {
			return false;
		}
		if(65 <= $c && $c <= 90) {
			return true;
		}
		if(97 <= $c && $c <= 122) {
			return true;
		}
		if(192 <= $c && $c <= 696 && $c !== 215 && $c !== 247) {
			return true;
		}
		if(867 <= $c && $c <= 1521) {
			return true;
		}
		if(1552 <= $c && $c <= 8188) {
			return true;
		}
		if($c === 8450 || $c === 8461 || $c === 8469 || $c === 8473 || $c === 8474 || $c === 8477 || $c === 8484) {
			return true;
		}
		if($c >= 13312 && $c <= 40959) {
			return true;
		}
		return false;
	}
	static function main() {
		$h = new com_wiris_quizzes_HTMLTools();
		$h->unitTest();
	}
	function __toString() { return 'com.wiris.quizzes.HTMLTools'; }
}
function com_wiris_quizzes_HTMLTools_0(&$a, &$b, &$i) {
	if(strlen($a) > strlen($b)) {
		return strlen($b);
	} else {
		return strlen($a);
	}
}
