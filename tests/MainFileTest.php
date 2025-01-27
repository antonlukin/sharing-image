<?php
/**
 * Class MainFileTest
 *
 * @package Sharing_Image
 */

use PHPUnit\Framework\TestCase;

/**
 * Unit tests for core plugin file.
 */
class MainFileTest extends TestCase {
	/**
	 * Test that vendor/autoload.php is included.
	 */
	public function test_includes_vendor_autoload() {
		$autoload_path = SHARING_IMAGE_DIR . 'vendor/autoload.php';
		$this->assertFileExists( $autoload_path, 'vendor/autoload.php is missing.' );
	}

	/**
	 * Test that functions.php is included.
	 */
	public function test_includes_functions_file() {
		$functions_path = SHARING_IMAGE_DIR . 'functions.php';
		$this->assertFileExists( $functions_path, 'functions.php is missing.' );
	}

	/**
	 * Test premium.php is included if it exists.
	 */
	public function test_includes_premium_file() {
		$premium_path = SHARING_IMAGE_DIR . 'premium.php';

		if ( ! file_exists( $premium_path ) ) {
			touch( $premium_path ); // phpcs:ignore
		}

		sharing_image_plugin();

		$this->assertTrue( file_exists( $premium_path ) );

		unlink( $premium_path ); // phpcs:ignore
	}

	/**
	 * Test that the sharing_image_plugin_classes filter works.
	 */
	public function test_classes_filter() {
		$custom_classes = array(
			'Sharing_Image\CustomClass1',
		);

		add_filter(
			'sharing_image_plugin_classes',
			function () use ( $custom_classes ) {
				return $custom_classes;
			}
		);

		$filtered_classes = apply_filters( 'sharing_image_plugin_classes', array() );

		$this->assertSame( $custom_classes, $filtered_classes, 'Filter sharing_image_plugin_classes did not apply correctly.' );
	}
}
