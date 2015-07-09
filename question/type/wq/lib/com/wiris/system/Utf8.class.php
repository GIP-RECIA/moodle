<?php

class com_wiris_system_Utf8 {
	public function __construct() { 
	}
	static function getLength($s) {
		return php_Utf8::length($s);
	}
	static function charCodeAt($s, $i) {
		return php_Utf8::charCodeAt($s, $i);
	}
	static function charAt($s, $i) {
		return php_Utf8::uchr(php_Utf8::charCodeAt($s, $i));
	}
	static function uchr($i) {
		return php_Utf8::uchr($i);
	}
	static function sub($s, $pos, $len) {
		return php_Utf8::sub($s, $pos, $len);
	}
	function __toString() { return 'com.wiris.system.Utf8'; }
}
