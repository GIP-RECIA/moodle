<?php

class com_wiris_quizzes_HTML {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		$this->s = new StringBuf();
		$this->tags = new _hx_array(array());
	}}
	public $s;
	public $tags;
	public function start($name, $attributes) {
		{
			$x = "<";
			if(is_null($x)) {
				$x = "null";
			} else {
				if(is_bool($x)) {
					$x = (($x) ? "true" : "false");
				}
			}
			$this->s->b .= $x;
		}
		{
			$x = $name;
			if(is_null($x)) {
				$x = "null";
			} else {
				if(is_bool($x)) {
					$x = (($x) ? "true" : "false");
				}
			}
			$this->s->b .= $x;
		}
		if($attributes !== null) {
			$i = null;
			{
				$_g1 = 0; $_g = $attributes->length;
				while($_g1 < $_g) {
					$i1 = $_g1++;
					if(_hx_array_get($attributes, $i1)->length === 2 && $attributes[$i1][0] !== null && $attributes[$i1][1] !== null) {
						{
							$x = " ";
							if(is_null($x)) {
								$x = "null";
							} else {
								if(is_bool($x)) {
									$x = (($x) ? "true" : "false");
								}
							}
							$this->s->b .= $x;
							unset($x);
						}
						{
							$x = $attributes[$i1][0];
							if(is_null($x)) {
								$x = "null";
							} else {
								if(is_bool($x)) {
									$x = (($x) ? "true" : "false");
								}
							}
							$this->s->b .= $x;
							unset($x);
						}
						{
							$x = "=\"";
							if(is_null($x)) {
								$x = "null";
							} else {
								if(is_bool($x)) {
									$x = (($x) ? "true" : "false");
								}
							}
							$this->s->b .= $x;
							unset($x);
						}
						{
							$x = com_wiris_util_xml_WXmlUtils::htmlEscape($attributes[$i1][1]);
							if(is_null($x)) {
								$x = "null";
							} else {
								if(is_bool($x)) {
									$x = (($x) ? "true" : "false");
								}
							}
							$this->s->b .= $x;
							unset($x);
						}
						{
							$x = "\"";
							if(is_null($x)) {
								$x = "null";
							} else {
								if(is_bool($x)) {
									$x = (($x) ? "true" : "false");
								}
							}
							$this->s->b .= $x;
							unset($x);
						}
					}
					unset($i1);
				}
			}
		}
	}
	public function open($name, $attributes) {
		$this->tags->push($name);
		$this->start($name, $attributes);
		{
			$x = ">";
			if(is_null($x)) {
				$x = "null";
			} else {
				if(is_bool($x)) {
					$x = (($x) ? "true" : "false");
				}
			}
			$this->s->b .= $x;
		}
	}
	public function openclose($name, $attributes) {
		$this->start($name, $attributes);
		{
			$x = "/>";
			if(is_null($x)) {
				$x = "null";
			} else {
				if(is_bool($x)) {
					$x = (($x) ? "true" : "false");
				}
			}
			$this->s->b .= $x;
		}
	}
	public function textEm($text) {
		$this->open("em", null);
		$this->text($text);
		$this->close();
	}
	public function text($text) {
		if($text !== null) {
			$x = com_wiris_util_xml_WXmlUtils::htmlEscape($text);
			if(is_null($x)) {
				$x = "null";
			} else {
				if(is_bool($x)) {
					$x = (($x) ? "true" : "false");
				}
			}
			$this->s->b .= $x;
		}
	}
	public function close() {
		{
			$x = "</";
			if(is_null($x)) {
				$x = "null";
			} else {
				if(is_bool($x)) {
					$x = (($x) ? "true" : "false");
				}
			}
			$this->s->b .= $x;
		}
		{
			$x = $this->tags->pop();
			if(is_null($x)) {
				$x = "null";
			} else {
				if(is_bool($x)) {
					$x = (($x) ? "true" : "false");
				}
			}
			$this->s->b .= $x;
		}
		{
			$x = ">";
			if(is_null($x)) {
				$x = "null";
			} else {
				if(is_bool($x)) {
					$x = (($x) ? "true" : "false");
				}
			}
			$this->s->b .= $x;
		}
	}
	public function getString() {
		return $this->s->b;
	}
	public function raw($raw) {
		$x = $raw;
		if(is_null($x)) {
			$x = "null";
		} else {
			if(is_bool($x)) {
				$x = (($x) ? "true" : "false");
			}
		}
		$this->s->b .= $x;
	}
	public function openDiv($id) {
		$this->open("div", new _hx_array(array(new _hx_array(array("id", $id)))));
	}
	public function openDivClass($id, $className) {
		$this->open("div", new _hx_array(array(new _hx_array(array("id", $id)), new _hx_array(array("class", $className)))));
	}
	public function openSpan($id, $className) {
		$this->open("span", new _hx_array(array(new _hx_array(array("id", $id)), new _hx_array(array("class", $className)))));
	}
	public function js($code) {
		$this->open("script", new _hx_array(array(new _hx_array(array("type", "text/javascript")))));
		$this->text($code);
		$this->close();
	}
	public function input($type, $id, $name, $value, $title, $className) {
		$this->openclose("input", new _hx_array(array(new _hx_array(array("type", $type)), new _hx_array(array("id", $id)), new _hx_array(array("name", $name)), new _hx_array(array("value", $value)), new _hx_array(array("class", $className)))));
	}
	public function textarea($id, $name, $value, $className, $lang) {
		$this->open("textarea", new _hx_array(array(new _hx_array(array("id", $id)), new _hx_array(array("name", $name)), new _hx_array(array("class", $className)), new _hx_array(array("lang", $lang)))));
		$this->text($value);
		$this->close();
	}
	public function image($id, $src, $title) {
		$this->openclose("img", new _hx_array(array(new _hx_array(array("id", $id)), new _hx_array(array("src", $src)), new _hx_array(array("alt", $title)), new _hx_array(array("title", $title)))));
	}
	public function openUl($id, $className) {
		$this->open("ul", new _hx_array(array(new _hx_array(array("id", $id)), new _hx_array(array("class", $className)))));
	}
	public function li($content) {
		$this->open("li", new _hx_array(array()));
		$this->text($content);
		$this->close();
	}
	public function openLi() {
		$this->open("li", new _hx_array(array()));
	}
	public function label($text, $id, $className) {
		$this->open("label", new _hx_array(array(new _hx_array(array("for", $id)), new _hx_array(array("class", $className)))));
		$this->text($text);
		$this->close();
	}
	public function openFieldset($id, $legend, $classes) {
		$className = "wirisfieldset";
		if($classes !== null && strlen($classes) > 0) {
			$className .= " " . $classes;
		}
		$this->open("fieldset", new _hx_array(array(new _hx_array(array("id", $id)), new _hx_array(array("class", $className)))));
		$this->open("legend", new _hx_array(array(new _hx_array(array("class", $classes)))));
		$this->text($legend);
		$this->close();
	}
	public function select($id, $name, $options) {
		$this->open("select", new _hx_array(array(new _hx_array(array("id", $id)), new _hx_array(array("name", $name)))));
		$i = null;
		{
			$_g1 = 0; $_g = $options->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$this->open("option", new _hx_array(array(new _hx_array(array("value", $options[$i1][0])))));
				$this->text($options[$i1][1]);
				$this->close();
				unset($i1);
			}
		}
		$this->close();
	}
	public function openA($id, $href, $className) {
		$this->open("a", new _hx_array(array(new _hx_array(array("id", $id)), new _hx_array(array("href", $href)), new _hx_array(array("class", $className)))));
	}
	public function openStrong() {
		$this->open("strong", null);
	}
	public function help($id, $href, $title) {
		$this->openSpan($id . "span", "wirishelp");
		$this->open("a", new _hx_array(array(new _hx_array(array("id", $id)), new _hx_array(array("href", $href)), new _hx_array(array("class", "wirishelp")), new _hx_array(array("title", $title)), new _hx_array(array("target", "_blank")))));
		$this->close();
		$this->close();
	}
	public function openP() {
		$this->open("p", null);
	}
	public function formatText($text) {
		$ps = _hx_explode("\x0A", $text);
		$i = null;
		{
			$_g1 = 0; $_g = $ps->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$this->openP();
				$this->text($ps[$i1]);
				$this->close();
				unset($i1);
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
	function __toString() { return 'com.wiris.quizzes.HTML'; }
}
