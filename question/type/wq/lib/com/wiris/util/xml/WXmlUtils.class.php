<?php

class com_wiris_util_xml_WXmlUtils {
	public function __construct(){}
	static function getElementContent($element) {
		$sb = new StringBuf();
		$i = $element->iterator();
		while($i->hasNext()) {
			$x = $i->next()->toString();
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
		return $sb->b;
	}
	static function getElementsByAttributeValue($nodeList, $attributeName, $attributeValue) {
		$nodes = new _hx_array(array());
		while($nodeList->hasNext()) {
			$node = $nodeList->next();
			if($node->nodeType == Xml::$Element && $attributeValue === com_wiris_util_xml_WXmlUtils::getAttribute($node, $attributeName)) {
				$nodes->push($node);
			}
			unset($node);
		}
		return $nodes;
	}
	static function getElementsByTagName($nodeList, $tagName) {
		$nodes = new _hx_array(array());
		while($nodeList->hasNext()) {
			$node = $nodeList->next();
			if($node->nodeType == Xml::$Element && $node->getNodeName() === $tagName) {
				$nodes->push($node);
			}
			unset($node);
		}
		return $nodes;
	}
	static function getElements($node) {
		$nodes = new _hx_array(array());
		$nodeList = $node->iterator();
		while($nodeList->hasNext()) {
			$item = $nodeList->next();
			if($item->nodeType == Xml::$Element) {
				$nodes->push($item);
			}
			unset($item);
		}
		return $nodes;
	}
	static function getDocumentElement($doc) {
		$nodeList = $doc->iterator();
		while($nodeList->hasNext()) {
			$node = $nodeList->next();
			if($node->nodeType == Xml::$Element) {
				return $node;
			}
			unset($node);
		}
		return null;
	}
	static function getAttribute($node, $attributeName) {
		$value = $node->get($attributeName);
		if($value === null) {
			return null;
		}
		if(com_wiris_settings_PlatformSettings::$PARSE_XML_ENTITIES) {
			return com_wiris_util_xml_WXmlUtils::htmlUnescape($value);
		}
		return $value;
	}
	static function createPCData($node, $text) {
		if(com_wiris_settings_PlatformSettings::$PARSE_XML_ENTITIES) {
			$text = com_wiris_util_xml_WXmlUtils::htmlEscape($text);
		}
		return Xml::createPCData($text);
	}
	static function htmlEscape($input) {
		$output = str_replace("&", "&amp;", $input);
		$output = str_replace("<", "&lt;", $output);
		$output = str_replace(">", "&gt;", $output);
		$output = str_replace("\"", "&quot;", $output);
		return $output;
	}
	static function htmlUnescape($input) {
		$output = "";
		$start = 0;
		$position = _hx_index_of($input, "&", $start);
		while($position !== -1) {
			$output .= _hx_substr($input, $start, $position - $start);
			if(_hx_char_at($input, $position + 1) === "#") {
				$startPosition = $position + 2;
				$endPosition = _hx_index_of($input, ";", $startPosition);
				if($endPosition !== -1) {
					$number = _hx_substr($input, $startPosition, $endPosition - $startPosition);
					if(StringTools::startsWith($number, "x")) {
						$number = "0" . $number;
					}
					$charCode = Std::parseInt($number);
					$output .= php_Utf8::uchr($charCode);
					$start = $endPosition + 1;
					unset($number,$charCode);
				} else {
					$output .= "&";
					$start = $position + 1;
				}
				unset($startPosition,$endPosition);
			} else {
				$output .= "&";
				$start = $position + 1;
			}
			$position = _hx_index_of($input, "&", $start);
		}
		$output .= _hx_substr($input, $start, strlen($input) - $start);
		$output = str_replace("&lt;", "<", $output);
		$output = str_replace("&gt;", ">", $output);
		$output = str_replace("&quot;", "\"", $output);
		$output = str_replace("&amp;", "&", $output);
		return $output;
	}
	static $entities;
	static function parseXML($xml) {
		$xml = com_wiris_util_xml_WXmlUtils::filterMathMLEntities($xml);
		$x = Xml::parse($xml);
		return $x;
	}
	static function serializeXML($xml) {
		$s = $xml->toString();
		$s = com_wiris_util_xml_WXmlUtils::filterMathMLEntities($s);
		return $s;
	}
	static function filterMathMLEntities($text) {
		com_wiris_util_xml_WXmlUtils::initEntities();
		$sb = new StringBuf();
		$i = 0;
		$n = strlen($text);
		while($i < $n) {
			$c = _hx_char_code_at($text, $i);
			if($c > 127) {
				$d = $c;
				if(com_wiris_settings_PlatformSettings::$UTF8_CONVERSION) {
					$j = 0;
					$c = 128;
					do {
						$c = $c >> 1;
						$j++;
					} while(($d & $c) !== 0);
					$d = $c - 1 & $d;
					while(--$j > 0) {
						$i++;
						$c = _hx_char_code_at($text, $i);
						$d = ($d << 6) + ($c & 63);
					}
					unset($j);
				}
				{
					$x = "&#" . $d . ";";
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
				unset($d);
			} else {
				$sb->b .= chr($c);
				if($c === 38) {
					$i++;
					$c = _hx_char_code_at($text, $i);
					if(com_wiris_util_xml_WXmlUtils::isNameStart($c)) {
						$name = new StringBuf();
						$name->b .= chr($c);
						$i++;
						$c = _hx_char_code_at($text, $i);
						while(com_wiris_util_xml_WXmlUtils::isNameChar($c)) {
							$name->b .= chr($c);
							$i++;
							$c = _hx_char_code_at($text, $i);
						}
						$ent = $name->b;
						if($c === 59 && com_wiris_util_xml_WXmlUtils::$entities->exists($ent)) {
							$val = com_wiris_util_xml_WXmlUtils::$entities->get($ent);
							{
								$x = "#";
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
								$x = $val;
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
							unset($val);
						} else {
							$x = $name;
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
						unset($name,$ent);
					} else {
						if($c === 35) {
							$sb->b .= chr($c);
							$i++;
							$c = _hx_char_code_at($text, $i);
							if($c === 120) {
								$hex = new StringBuf();
								$i++;
								$c = _hx_char_code_at($text, $i);
								while(com_wiris_util_xml_WXmlUtils::isHexDigit($c)) {
									$hex->b .= chr($c);
									$i++;
									$c = _hx_char_code_at($text, $i);
								}
								$hent = $hex->b;
								if($c === 59) {
									$dec = Std::parseInt("0x" . $hent);
									{
										$x = "" . $dec;
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
									unset($dec);
								} else {
									{
										$x = "x";
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
										$x = $hent;
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
								}
								unset($hex,$hent);
							}
						}
					}
					$sb->b .= chr($c);
				}
			}
			$i++;
			unset($c);
		}
		return $sb->b;
	}
	static function isNameStart($c) {
		if(65 <= $c && $c <= 90) {
			return true;
		}
		if(97 <= $c && $c <= 122) {
			return true;
		}
		if($c === 95 || $c === 58) {
			return true;
		}
		return false;
	}
	static function isNameChar($c) {
		if(com_wiris_util_xml_WXmlUtils::isNameStart($c)) {
			return true;
		}
		if(48 <= $c && $c <= 57) {
			return true;
		}
		if($c === 46 || $c === 45) {
			return true;
		}
		return false;
	}
	static function isHexDigit($c) {
		if($c >= 48 && $c <= 57) {
			return true;
		}
		if($c >= 65 && $c <= 70) {
			return true;
		}
		if($c >= 97 && $c <= 102) {
			return true;
		}
		return false;
	}
	static function initEntities() {
		if(com_wiris_util_xml_WXmlUtils::$entities === null) {
			$e = com_wiris_util_xml_WEntities::$MATHML_ENTITIES;
			com_wiris_util_xml_WXmlUtils::$entities = new Hash();
			$start = 0;
			$mid = null;
			while(($mid = _hx_index_of($e, "@", $start)) !== -1) {
				$name = _hx_substr($e, $start, $mid - $start);
				$mid++;
				$start = _hx_index_of($e, "@", $mid);
				if($start === -1) {
					break;
				}
				$value = _hx_substr($e, $mid, $start - $mid);
				$num = Std::parseInt("0x" . $value);
				com_wiris_util_xml_WXmlUtils::$entities->set($name, "" . $num);
				$start++;
				unset($value,$num,$name);
			}
		}
	}
	function __toString() { return 'com.wiris.util.xml.WXmlUtils'; }
}
