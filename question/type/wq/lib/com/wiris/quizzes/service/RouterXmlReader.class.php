<?php

class com_wiris_quizzes_service_RouterXmlReader {
	public function __construct() { 
	}
	static $DEFAULT_ROUTER_XML_LOCATION = "router.xml";
	static function readRouter() {
		$location = com_wiris_quizzes_QuizzesConfig::$QUIZZES_SERVICE_ROUTER_LOCATION;
		$s = null;
		if($location !== null) {
			$s = com_wiris_system_Storage::newStorage($location);
		}
		if($location === null || !$s->exists()) {
			if($location === null) {
				$location = com_wiris_quizzes_service_RouterXmlReader::$DEFAULT_ROUTER_XML_LOCATION;
			}
			$s = com_wiris_system_Storage::newResourceStorage($location);
		}
		$content = null;
		$content = $s->read();
		$router = new Hash();
		$xml = null;
		$xml = com_wiris_util_xml_WXmlUtils::parseXML($content);
		com_wiris_quizzes_service_RouterXmlReader::populateRouter($xml, $router);
		return $router;
	}
	static function populateRouter($elem, $router) {
		if($elem->nodeType != Xml::$Element && $elem->nodeType != Xml::$Document) {
			return;
		}
		if($elem->nodeType == Xml::$Element && $elem->getNodeName() === "service") {
			$it = $elem->elements();
			$name = null;
			$url = null;
			while($it->hasNext()) {
				$c = $it->next();
				if($c->getNodeName() === "name") {
					$name = com_wiris_util_xml_WXmlUtils::getElementContent($c);
				} else {
					if($c->getNodeName() === "url") {
						$url = com_wiris_util_xml_WXmlUtils::getElementContent($c);
					}
				}
				unset($c);
			}
			if($name !== null && $url !== null) {
				$router->set($name, $url);
			}
		} else {
			$it = $elem->elements();
			while($it->hasNext()) {
				com_wiris_quizzes_service_RouterXmlReader::populateRouter($it->next(), $router);
			}
		}
	}
	function __toString() { return 'com.wiris.quizzes.service.RouterXmlReader'; }
}
