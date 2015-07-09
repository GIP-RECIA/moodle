<?php

class com_wiris_quizzes_QuizzesService {
	public function __construct($url) {
		if(!php_Boot::$skip_constructor) {
		$this->protocol = com_wiris_quizzes_QuizzesService::$PROTOCOL_REST;
		$this->url = $url;
		if($this->url === null) {
			$this->url = com_wiris_quizzes_QuizzesConfig::$QUIZZES_SERVICE_URL;
		}
	}}
	public $url;
	public $protocol;
	public function execute($req) {
		$mqr = new com_wiris_quizzes_MultipleQuestionRequest();
		$mqr->questionRequests = new _hx_array(array());
		$mqr->questionRequests->push($req);
		$mqs = $this->executeMultiple($mqr);
		if($mqs->questionResponses->length === 0) {
			return new com_wiris_quizzes_QuestionResponse();
		} else {
			return $mqs->questionResponses[0];
		}
	}
	public function executeMultiple($mqr) {
		$s = new com_wiris_quizzes_Serializer();
		$postData = $s->write($mqr);
		$postData = $this->webServiceEnvelope($postData);
		$data = $this->stripWebServiceEnvelope($this->callQuizzesService($postData));
		$res = com_wiris_quizzes_RequestBuilder::getInstance()->newMultipleResponseFromXml($data);
		return $res;
	}
	public function callQuizzesService($postData) {
		$http = null;
		if(com_wiris_settings_PlatformSettings::$IS_JAVASCRIPT) {
			$url = com_wiris_quizzes_QuizzesConfig::$QUIZZES_PROXY_URL;
			$http = new com_wiris_quizzes_HttpImpl($url);
			$http->setParameter("service", "quizzes");
			$http->setParameter("rawpostdata", "true");
			$http->setParameter("postdata", $postData);
			$http->setHeader("Connection", "close");
			$http->setHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		} else {
			$url = $this->getServiceUrl();
			$http = new com_wiris_quizzes_HttpImpl($url);
			$http->setHeader("Content-Length", "" . strlen($postData));
			$http->setHeader("Connection", "close");
			$http->setHeader("Content-Type", "text/xml; charset=UTF-8");
			$http->setPostData("\x0D\x0A" . $postData);
		}
		$http->request(true);
		$response = $http->response;
		if($this->isFault($response)) {
			throw new HException("Remote exception: " . $this->getFaultMessage($response));
		}
		return $response;
	}
	public function isFault($response) {
		if($this->protocol === com_wiris_quizzes_QuizzesService::$PROTOCOL_REST) {
			return _hx_index_of($response, "<fault>", null) !== -1;
		}
		return false;
	}
	public function getFaultMessage($response) {
		if($this->protocol === com_wiris_quizzes_QuizzesService::$PROTOCOL_REST) {
			$start = _hx_index_of($response, "<fault>", null) + 7;
			$end = _hx_index_of($response, "</fault>", null);
			$msg = _hx_substr($response, $start, $end - $start);
			return com_wiris_util_xml_WXmlUtils::htmlUnescape($msg);
		}
		return $response;
	}
	public function webServiceEnvelope($data) {
		if($this->protocol === com_wiris_quizzes_QuizzesService::$PROTOCOL_REST) {
			$data = "<doProcessQuestions>" . $data . "</doProcessQuestions>";
		}
		return $data;
	}
	public function stripWebServiceEnvelope($data) {
		if($this->protocol === com_wiris_quizzes_QuizzesService::$PROTOCOL_REST) {
			$startTagName = "doProcessQuestionsResponse";
			$start = _hx_index_of($data, "<" . $startTagName . ">", null) + strlen($startTagName) + 2;
			$end = _hx_index_of($data, "</" . $startTagName . ">", null);
			$data = _hx_substr($data, $start, $end - $start);
		}
		return $data;
	}
	public function getServiceUrl() {
		$url = $this->url;
		if($this->protocol === com_wiris_quizzes_QuizzesService::$PROTOCOL_REST) {
			$url .= "/rest";
		}
		return $url;
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
	static $PROTOCOL_REST = 0;
	function __toString() { return 'com.wiris.quizzes.QuizzesService'; }
}
