<?php

class com_wiris_system_StringEx {
	public function __construct(){}
	static function substring($s, $start, $end) {
		if($end === null) {
			return _hx_substr($s, $start, null);
		}
		return _hx_substr($s, $start, $end - $start);
	}
	function __toString() { return 'com.wiris.system.StringEx'; }
}
