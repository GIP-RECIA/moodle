<?php

class com_wiris_settings_PlatformSettings {
	public function __construct(){}
	static $PARSE_XML_ENTITIES = true;
	static $UTF8_CONVERSION = true;
	static $IS_JAVASCRIPT = false;
	function __toString() { return 'com.wiris.settings.PlatformSettings'; }
}
