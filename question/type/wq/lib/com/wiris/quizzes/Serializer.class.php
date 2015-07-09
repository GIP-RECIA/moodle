<?php

class com_wiris_quizzes_Serializer {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		$this->tags = new Hash();
		$this->elementStack = new _hx_array(array());
		$this->childrenStack = new _hx_array(array());
		$this->childStack = new _hx_array(array());
	}}
	public $mode;
	public $element;
	public $children;
	public $child;
	public $elementStack;
	public $childrenStack;
	public $childStack;
	public $tags;
	public $currentTag;
	public function read($xml) {
		$document = com_wiris_util_xml_WXmlUtils::parseXML($xml);
		$this->setCurrentElement($document->firstElement());
		$this->mode = com_wiris_quizzes_Serializer::$MODE_READ;
		return $this->readNode();
	}
	public function write($s) {
		$this->mode = com_wiris_quizzes_Serializer::$MODE_WRITE;
		$this->element = Xml::createDocument();
		$s->onSerialize($this);
		$res = com_wiris_util_xml_WXmlUtils::serializeXML($this->element);
		return $res;
	}
	public function beginTag($tag) {
		if($this->mode === com_wiris_quizzes_Serializer::$MODE_READ) {
			return $tag === $this->element->getNodeName();
		} else {
			if($this->mode === com_wiris_quizzes_Serializer::$MODE_WRITE) {
				$child = Xml::createElement($tag);
				$this->element->addChild($child);
				$this->element = $child;
			} else {
				if($this->mode === com_wiris_quizzes_Serializer::$MODE_REGISTER && $this->currentTag === null) {
					$this->currentTag = $tag;
				}
			}
		}
		return true;
	}
	public function childString($name, $value, $def) {
		if($this->mode === com_wiris_quizzes_Serializer::$MODE_READ) {
			$child = $this->currentChild();
			if($child !== null && $child->getNodeName() === $name) {
				$value = com_wiris_quizzes_Serializer::getXmlTextContent($child);
				$this->nextChild();
			} else {
				$value = $def;
			}
		} else {
			if($this->mode === com_wiris_quizzes_Serializer::$MODE_WRITE) {
				if($value !== null && !($value === $def)) {
					$this->beginTag($name);
					$this->textContent($value);
					$this->endTag();
				} else {
					if($value === null && $def !== null) {
						$this->beginTag($name);
						$this->endTag();
					}
				}
			}
		}
		return $value;
	}
	public function endTag() {
		if($this->mode === com_wiris_quizzes_Serializer::$MODE_READ) {
			$this->element = $this->element->getParent();
		} else {
			if($this->mode === com_wiris_quizzes_Serializer::$MODE_WRITE) {
				$this->element = $this->element->getParent();
			}
		}
	}
	public function attributeString($name, $value, $def) {
		if($this->mode === com_wiris_quizzes_Serializer::$MODE_READ) {
			$value = $this->element->get($name);
			if($value === null) {
				$value = $def;
			}
		} else {
			if($this->mode === com_wiris_quizzes_Serializer::$MODE_WRITE) {
				if($value !== null && !($value === $def)) {
					$this->element->set($name, $value);
				}
			}
		}
		return $value;
	}
	public function attributeBoolean($name, $value, $def) {
		return com_wiris_quizzes_Serializer::parseBoolean($this->attributeString($name, com_wiris_quizzes_Serializer::booleanToString($value), com_wiris_quizzes_Serializer::booleanToString($def)));
	}
	public function attributeInt($name, $value, $def) {
		return Std::parseInt($this->attributeString($name, "" . $value, "" . $def));
	}
	public function attributeFloat($name, $value, $def) {
		return Std::parseFloat($this->attributeString($name, "" . $value, "" . $def));
	}
	public function textContent($content) {
		if($this->mode === com_wiris_quizzes_Serializer::$MODE_READ) {
			$content = com_wiris_quizzes_Serializer::getXmlTextContent($this->element);
		} else {
			if($this->mode === com_wiris_quizzes_Serializer::$MODE_WRITE && $content !== null) {
				$textNode = null;
				$xmlContent = $content;
				if(com_wiris_settings_PlatformSettings::$PARSE_XML_ENTITIES) {
					$xmlContent = com_wiris_util_xml_WXmlUtils::htmlEscape($xmlContent);
				}
				$textNode = Xml::createPCData($xmlContent);
				$this->element->addChild($textNode);
			}
		}
		return $content;
	}
	public function booleanContent($content) {
		if($this->mode === com_wiris_quizzes_Serializer::$MODE_READ) {
			$content = com_wiris_quizzes_Serializer::parseBoolean(com_wiris_quizzes_Serializer::getXmlTextContent($this->element));
		} else {
			if($this->mode === com_wiris_quizzes_Serializer::$MODE_WRITE) {
				$textNode = Xml::createPCData(com_wiris_quizzes_Serializer::booleanToString($content));
				$this->element->addChild($textNode);
			}
		}
		return $content;
	}
	public function serializeChild($s) {
		if($this->mode === com_wiris_quizzes_Serializer::$MODE_READ) {
			$child = $this->currentChild();
			if($child !== null) {
				$this->pushState();
				$this->setCurrentElement($child);
				$s = $this->readNode();
				$this->popState();
				$this->nextChild();
			} else {
				$s = null;
			}
		} else {
			if($this->mode === com_wiris_quizzes_Serializer::$MODE_WRITE && $s !== null) {
				_hx_deref(($s))->onSerialize($this);
			}
		}
		return $s;
	}
	public function serializeArray($array, $tagName) {
		if($this->mode === com_wiris_quizzes_Serializer::$MODE_READ) {
			$array = new _hx_array(array());
			$child = $this->currentChild();
			if($child !== null) {
				if($tagName === null) {
					$tagName = $child->getNodeName();
				}
				while($child !== null && $tagName === $child->getNodeName()) {
					$this->pushState();
					$this->setCurrentElement($child);
					$elem = $this->readNode();
					$array->push($elem);
					$this->popState();
					$child = $this->nextChild();
					unset($elem);
				}
			}
		} else {
			if($this->mode === com_wiris_quizzes_Serializer::$MODE_WRITE && $array !== null && $array->length > 0) {
				$items = $array->iterator();
				while($items->hasNext()) {
					_hx_deref(($items->next()))->onSerialize($this);
				}
			}
		}
		return $array;
	}
	public function serializeChildName($s, $tagName) {
		if($this->mode === com_wiris_quizzes_Serializer::$MODE_READ) {
			$child = $this->currentChild();
			if($child !== null && $child->getNodeName() === $tagName) {
				$s = $this->serializeChild($s);
			}
		} else {
			if($this->mode === com_wiris_quizzes_Serializer::$MODE_WRITE) {
				$s = $this->serializeChild($s);
			}
		}
		return $s;
	}
	public function serializeArrayName($array, $tagName) {
		if($this->mode === com_wiris_quizzes_Serializer::$MODE_READ) {
			$child = $this->currentChild();
			if($child !== null && $child->getNodeName() === $tagName) {
				$this->pushState();
				$this->setCurrentElement($child);
				$array = $this->serializeArray($array, null);
				$this->popState();
				$this->nextChild();
			}
		} else {
			if($this->mode === com_wiris_quizzes_Serializer::$MODE_WRITE && $array !== null && $array->length > 0) {
				$element = $this->element;
				$this->element = Xml::createElement($tagName);
				$element->addChild($this->element);
				$array = $this->serializeArray($array, null);
				$this->element = $element;
			}
		}
		return $array;
	}
	public function register($elem) {
		$this->tags->set($this->getTagName($elem), $elem);
	}
	public function getTagName($elem) {
		$mode = $this->mode;
		$this->mode = com_wiris_quizzes_Serializer::$MODE_REGISTER;
		$this->currentTag = null;
		$elem->onSerialize($this);
		$this->mode = $mode;
		return $this->currentTag;
	}
	public function readNode() {
		if(!$this->tags->exists($this->element->getNodeName())) {
			throw new HException("Tag " . $this->element->getNodeName() . " not registered.");
		}
		$model = $this->tags->get($this->element->getNodeName());
		$node = $model->newInstance();
		$node->onSerialize($this);
		return $node;
	}
	public function setCurrentElement($element) {
		$this->element = $element;
		$this->children = $this->element->elements();
		$this->child = null;
	}
	public function nextChild() {
		if($this->children->hasNext()) {
			$this->child = $this->children->next();
		} else {
			$this->child = null;
		}
		return $this->child;
	}
	public function currentChild() {
		if($this->child === null && $this->children->hasNext()) {
			$this->child = $this->children->next();
		}
		return $this->child;
	}
	public function pushState() {
		$this->elementStack->push($this->element);
		$this->childrenStack->push($this->children);
		$this->childStack->push($this->child);
	}
	public function popState() {
		$this->element = $this->elementStack->pop();
		$this->children = $this->childrenStack->pop();
		$this->child = $this->childStack->pop();
	}
	public function serializeIntName($tagName, $value, $def) {
		if($this->mode === com_wiris_quizzes_Serializer::$MODE_READ && $this->currentChild() !== null && $this->child->getNodeName() === $tagName || $this->mode === com_wiris_quizzes_Serializer::$MODE_WRITE && $value !== $def) {
			$this->beginTag($tagName);
			$content = $this->textContent("" . $value);
			$value = Std::parseInt($content);
			$this->endTag();
		}
		return $value;
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
	static $MODE_READ = 0;
	static $MODE_WRITE = 1;
	static $MODE_REGISTER = 2;
	static function getXmlTextContent($element) {
		if($element->nodeType == Xml::$CData || $element->nodeType == Xml::$PCData) {
			$value = $element->getNodeValue();
			if(com_wiris_settings_PlatformSettings::$PARSE_XML_ENTITIES && $element->nodeType == Xml::$PCData) {
				$value = com_wiris_util_xml_WXmlUtils::htmlUnescape($value);
			}
			return $value;
		} else {
			if($element->nodeType == Xml::$Document || $element->nodeType == Xml::$Element) {
				$sb = new StringBuf();
				$children = $element->iterator();
				while($children->hasNext()) {
					$x = com_wiris_quizzes_Serializer::getXmlTextContent($children->next());
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
			} else {
				return "";
			}
		}
	}
	static function parseBoolean($s) {
		return strtolower($s) === "true" || $s === "1";
	}
	static function booleanToString($b) {
		return (($b) ? "true" : "false");
	}
	function __toString() { return 'com.wiris.quizzes.Serializer'; }
}
