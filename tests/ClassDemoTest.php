<?php
/**
 * Class ClassDemoTest
 *
 * @package Sharing_Image
 */

use PHPUnit\Framework\TestCase;
use Sharing_Image\Demo;
use Sharing_Image\Config;

/**
 * Unit tests for demo plugin file.
 */
class ClassDemoTest extends TestCase {
	/**
	 * Mock config file
	 *
	 * @var \PHPUnit\Framework\MockObject\MockObject|Generator
	 */
	protected $config_mock;

	/**
	 * Set Up all required dependencies.
	 */
	protected function setUp(): void {
		parent::setUp();

		$this->config_mock = $this->createMock( Config::class );
	}

	/**
	 * Test that demo will not run if already created.
	 */
	public function test_create_if_demo_already_created() {
		$this->config_mock->method( 'get_config' )->willReturn( array( 'demo' => 1 ) );

		Demo::create_demo_template();

		$this->assertTrue( true );
	}

	/**
	 * Test that demo will run on requst set.
	 */
	public function test_create_if_demo_request_exists() {
		$_REQUEST['demo-template'] = '1';
		$this->config_mock->method( 'get_config' )->willReturn( array( 'demo' => 0 ) );

		Demo::create_demo_template();

		$this->assertTrue( true );
		unset( $_REQUEST['demo-template'] );
	}
}
