<?php
/**
 * Class ClassToolsTest
 *
 * @package Sharing_Image
 */

use PHPUnit\Framework\TestCase;
use Sharing_Image\Tools;

/**
 * Unit tests for tools class file.
 */
class ClassToolsTest extends TestCase {
	/**
	 * Test if handle_requests adds the correct actions.
	 */
	public function test_handle_requests() {
		Tools::handle_requests();

		$this->assertFalse( has_action( 'admin_post_sharing_image_save_config', array( Tools::class, 'save_config_tab' ) ) );
		$this->assertNotFalse( has_action( 'admin_post_sharing_image_export_templates', array( Tools::class, 'export_templates' ) ) );
		$this->assertNotFalse( has_action( 'admin_post_sharing_image_import_templates', array( Tools::class, 'import_templates' ) ) );
		$this->assertNotFalse( has_action( 'admin_post_sharing_image_clone_template', array( Tools::class, 'clone_template' ) ) );
		$this->assertNotFalse( has_action( 'admin_post_sharing_image_clear_templates', array( Tools::class, 'clear_templates' ) ) );
	}
}
