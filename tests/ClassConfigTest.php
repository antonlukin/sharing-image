<?php
/**
 * Class ClassConfigTest
 *
 * @package Sharing_Image
 */

use PHPUnit\Framework\TestCase;
use Sharing_Image\Config;

/**
 * Unit tests for config class file.
 */
class ClassConfigTest extends TestCase {
	/**
	 * Test if init adds the correct actions.
	 */
	public function test_init() {
		Config::init();

		$this->assertTrue( has_action( 'admin_init', array( Config::class, 'handle_requests' ) ) !== false );
	}

	/**
	 * Test if handle_requests adds the correct actions.
	 */
	public function test_handle_requests() {
		Config::handle_requests();

		$this->assertTrue( has_action( 'admin_post_sharing_image_save_config', array( Config::class, 'save_config_tab' ) ) !== false );
	}

	/**
	 * Test if config is correctly updated.
	 */
	public function test_update_config() {
		$mock_config = array( 'key' => 'value' );

		Config::update_config( $mock_config );

		$this->assertSame( $mock_config, get_option( Config::OPTION_CONFIG ) );
	}

	/**
	 * Test if config is sanitized properly.
	 */
	public function test_sanitize_config() {
		$input_config = array(
			'default'      => '123',
			'format'       => 'png',
			'quality'      => '95',
			'uploads'      => 'custom',
			'autogenerate' => 'some-key',
			'storage'      => '/custom/storage/',
			'meta'         => 'custom',
		);

		$expected_config = array(
			'default'      => 123,
			'format'       => 'png',
			'quality'      => 95,
			'uploads'      => 'custom',
			'autogenerate' => 'some-key',
			'storage'      => '/custom/storage/',
			'meta'         => 'custom',
		);

		$sanitized_config = $this->invokePrivateMethod( Config::class, 'sanitize_config', array( $input_config ) );

		$this->assertEquals( $expected_config, $sanitized_config );
	}

	/**
	 * Test get_upload_dir returns correct data.
	 */
	public function test_get_upload_dir() {
		$uploads = Config::get_upload_dir();

		$expected_dir = wp_upload_dir();

		$this->assertEquals( $expected_dir['path'], $uploads[0] );
		$this->assertEquals( $expected_dir['url'], $uploads[1] );
	}

	/**
	 * Test get_file_format returns the default or configured format.
	 */
	public function test_get_file_format() {
		$this->assertEquals( 'jpg', Config::get_file_format() );

		update_option( Config::OPTION_CONFIG, array( 'format' => 'png' ) );

		$this->assertEquals( 'png', Config::get_file_format() );
	}

	/**
	 * Test get_default_poster_src returns correct data.
	 */
	public function test_get_default_poster_src() {
		update_option( Config::OPTION_CONFIG, array( 'default' => 123 ) );

		add_filter(
			'wp_get_attachment_image_src',
			function () {
				return array( 'url', 'width', 'height' );
			}
		);

		$poster = Config::get_default_poster_src();

		$this->assertIsArray( $poster );
		$this->assertCount( 3, $poster );
	}

	/**
	 * Utility to call private or protected methods for testing.
	 *
	 * @param string $config_class Fully qualified name of the class containing the method.
	 * @param string $method       Name of the private or protected method to invoke.
	 * @param array  $args         Optional. Array of arguments to pass to the method. Default empty array.
	 *
	 * @return mixed
	 */
	private function invokePrivateMethod( $config_class, $method, $args = array() ) {
		$reflection = new ReflectionMethod( $config_class, $method );
		$reflection->setAccessible( true );

		return $reflection->invokeArgs( null, $args );
	}
}
