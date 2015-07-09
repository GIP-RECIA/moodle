<?php

class com_wiris_quizzes_Serializable {
	public function __construct() { 
	}
	public function onSerialize($s) {
	}
	public function newInstance() {
		return new com_wiris_quizzes_Serializable();
	}
	public function serialize() {
		$s = new com_wiris_quizzes_Serializer();
		return $s->write($this);
	}
	function __toString() { return 'com.wiris.quizzes.Serializable'; }
}
