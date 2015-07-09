<?php

class com_wiris_quizzes_QuizzesConfig {
	public function __construct() { 
	}
	static $WIRIS_SERVICE_URL = "http://www.wiris.net/demo/wiris";
	static $EDITOR_SERVICE_URL = "http://www.wiris.net/demo/editor";
	static $QUIZZES_SERVICE_URL = "http://www.wiris.net/demo/quizzes";
	static $QUIZZES_PROXY_URL = "/quizzesproxy/service";
	static $QUIZZES_RESOURCES_URL = "/quizzesproxy";
	static $QUIZZES_SERVICE_ROUTER_LOCATION = "router.xml";
	static $QUIZZES_CACHE_PATH = "E:\\tmp\\image-cache";
	function __toString() { return 'com.wiris.quizzes.QuizzesConfig'; }
}
