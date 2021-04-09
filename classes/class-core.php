<?php

namespace Sharing_Image;

class Core {
	function __construct() {
		return $this->init_env();
	}

	private function init_env() {
		new Metabox();
		new Settings();
	}
}
