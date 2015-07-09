<?php

class com_wiris_quizzes_service_ServiceTools {
	public function __construct() { 
	}
	static function getContentType($name) {
		$ext = _hx_substr($name, _hx_last_index_of($name, ".", null) + 1, null);
		if($ext === "png") {
			return "image/png";
		} else {
			if($ext === "gif") {
				return "image/gif";
			} else {
				if($ext === "jpg" || $ext === "jpeg") {
					return "image/jpeg";
				} else {
					if($ext === "html" || $ext === "html") {
						return "text/html";
					} else {
						if($ext === "css") {
							return "text/css";
						} else {
							if($ext === "js") {
								return "application/x-javascript";
							} else {
								if($ext === "js") {
									return "text/plain";
								} else {
									return "application/octet-stream";
								}
							}
						}
					}
				}
			}
		}
	}
	function __toString() { return 'com.wiris.quizzes.service.ServiceTools'; }
}
