<?php

class com_wiris_system_Storage {
	public function __construct($location) {
		if(!php_Boot::$skip_constructor) {
		$this->location = $location;
		if(com_wiris_system_Storage::$directorySeparator === null) {
			com_wiris_system_Storage::setDirectorySeparator();
		}
		if(com_wiris_system_Storage::$resourcesDir === null) {
			com_wiris_system_Storage::setResourcesDir();
		}
	}}
	public $location;
	public function read() {
		$res = null;
		$input = php_io_File::read($this->location, false);
		$bytes = $input->readAll(null);
		$res = $bytes->toString();
		return $res;
	}
	public function writeBinary($bs) {
		$bytes = haxe_io_Bytes::ofData($bs);
		$fo = php_io_File::write($this->location, true);
		$fo->writeBytes($bytes, 0, $bytes->length);
	}
	public function readBinary() {
		$res = null;
		$fi = php_io_File::read($this->location, true);
		$bytes = $fi->readAll(null);
		$res = $bytes->b;
		return $res;
	}
	public function exists() {
		$exists = false;
		$exists = file_exists($this->location);
		return $exists;
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
	static $directorySeparator;
	static $resourcesDir;
	static function newResourceStorage($name) {
		return new com_wiris_system_Storage(com_wiris_system_Storage::$resourcesDir . com_wiris_system_Storage::$directorySeparator . $name);
	}
	static function newStorage($name) {
		return new com_wiris_system_Storage($name);
	}
	static function setResourcesDir() {
		$filedir = dirname(__FILE__);
		com_wiris_system_Storage::$resourcesDir = _hx_substr($filedir, 0, _hx_last_index_of($filedir, com_wiris_system_Storage::$directorySeparator . "com" . com_wiris_system_Storage::$directorySeparator, null));
	}
	static function setDirectorySeparator() {
		$sep = null;
		$sep = DIRECTORY_SEPARATOR;
		com_wiris_system_Storage::$directorySeparator = $sep;
	}
	function __toString() { return 'com.wiris.system.Storage'; }
}
