<?php

class com_wiris_quizzes_service_PhpServiceProxy {
	public static function dispatch() {
		$proxy = new com_wiris_quizzes_service_PhpServiceProxy();
		$proxy->init();
		if($_SERVER['REQUEST_METHOD'] == 'GET') {
			$proxy->doGet();
		}else if($_SERVER['REQUEST_METHOD'] == 'POST') {
			$proxy->doPost();
		}
	}
	
	private $router;
	private function init() {
		$this->router = com_wiris_quizzes_service_RouterXmlReader::readRouter();
		$this->loadConfig();
	}
	
	private function loadConfig(){
		//This is an ugly hack that must be avoided when we merge the quizzes with the plugin.
		$thisdir = dirname(__FILE__);
		$basedir = substr($thisdir, 0, strrpos($thisdir, DIRECTORY_SEPARATOR . 'lib' . DIRECTORY_SEPARATOR . 'com' . DIRECTORY_SEPARATOR));
		$configfile = $basedir . '/config.php';
		if(is_readable($configfile)){
			require_once($configfile);
		}
	}
	
	private function doPost() {
		//Get parameters
		$service = $_POST['service'];
		if ($service == null) {
			$this->sendError(400, 'Missing "service" parameter.');
		}
		if ($service == 'cache') {
			$file = $_POST['name'];
			$this->sendCacheFile($file);
		} else {
			$this->route($service);
		}
	}
	private function doGet() {
		$_POST = $_GET;
		$this->doPost();
	}
	
	private function route($service) {
		if (!$this->router->exists($service)){
			$this->sendError(400, 'Service "'+$service+'" not found.');
		}
		$rawpostdata = isset($_POST['rawpostdata'])?$_POST['rawpostdata']:null;
		//Build query
		if($rawpostdata!=null && strtolower($rawpostdata) == 'true') {
		    $postdata = $_POST['postdata'];
			$mime = 'text/plain';
		}
		else{
			$mime = 'application/x-www-form-urlencoded';
			$uri = '';
			foreach($_POST as $key=>$value) {
				if($key != 'service' && $key != 'rawpostdata'){
					if(strlen($uri)>0) $uri .= '&';
					$uri .= urlencode($key);
					$uri .= '=';
					$uri .= urlencode($value);
				}
			}
			$postdata = $uri;
		}
		//Call service
		
		$referer = ((!empty($_SERVER['HTTPS']))?'https://':'http://') . $_SERVER['SERVER_NAME']. $_SERVER['SCRIPT_NAME'] . (isset($_SERVER['QUERY_STRING'])?$_SERVER['QUERY_STRING']:'');
		$context = stream_context_create();
		stream_context_set_option($context, 'http', 'method', 'POST');
		stream_context_set_option($context, 'http', 'header', 'Connection: close'."\r\n".
															  'Content-Type: '.$mime.'; charset=UTF-8'."\r\n".
															  'Referer: ' . $referer ."\r\n");
		stream_context_set_option($context, 'http', 'content', $postdata);
		stream_context_set_option($context, 'http', 'timeout', 20);
		
		$url = $this->router->get($service);
		$response = @file_get_contents($url, false, $context);
		if($response === false) {
			$this->sendError(500, 'Error connectiong with service.');
		}
		echo $response;
	}
	
	private function sendCacheFile($name) {
		$s = new com_wiris_system_Storage(com_wiris_quizzes_QuizzesConfig::$QUIZZES_CACHE_PATH . '/' . $name);
		$response = $s->readBinary();
		header("Content-Length: ".strlen($response));
		header("Content-Type: ".com_wiris_quizzes_service_ServiceTools::getContentType($name));
		echo $response;
	}
	
	private function sendError($code, $string){
		header($_SERVER["SERVER_PROTOCOL"] . ' '.$code.' '.$string);
		header('Status: '.$code.' '.$string);
		die();
	}
}
?>