<?php

namespace Sharing_Image;

class Core{
	function __construct() {
		return $this->init();
	}

	private function init() {
		new Metabox();
		$settings = new Settings();
		$settings->init();
	}
}
