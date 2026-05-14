<?php
/**
 * Class ClassGeneratorTest
 *
 * @package Sharing_Image
 */

use PHPUnit\Framework\TestCase;
use Sharing_Image\Generator;

/**
 * Unit tests for generator class file.
 */
class ClassGeneratorTest extends TestCase {
	/**
	 * Previous mb_internal_encoding value to restore in tearDown.
	 *
	 * @var string|null
	 */
	private $previous_internal_encoding = null;

	/**
	 * Reset filters and encoding between tests.
	 */
	protected function tearDown(): void {
		remove_all_filters( 'sharing_image_repair_mojibake' );

		if ( null !== $this->previous_internal_encoding ) {
			mb_internal_encoding( $this->previous_internal_encoding );
			$this->previous_internal_encoding = null;
		}

		parent::tearDown();
	}

	/**
	 * Non-string values must pass through normalize_text unchanged.
	 */
	public function test_normalize_text_passes_through_non_strings() {
		$this->assertSame( 42, Generator::normalize_text( 42 ) );
		$this->assertNull( Generator::normalize_text( null ) );
		$this->assertSame( array( 'a' ), Generator::normalize_text( array( 'a' ) ) );
	}

	/**
	 * Pure ASCII strings must remain untouched.
	 */
	public function test_normalize_text_keeps_ascii_intact() {
		$this->assertSame( '', Generator::normalize_text( '' ) );
		$this->assertSame( 'Hello, world!', Generator::normalize_text( 'Hello, world!' ) );
	}

	/**
	 * HTML entities must be decoded so they render as glyphs, not as text.
	 *
	 * @dataProvider provider_html_entities
	 *
	 * @param string $input    Raw text containing an HTML entity.
	 * @param string $expected Expected decoded text.
	 */
	public function test_normalize_text_decodes_html_entities( $input, $expected ) {
		$this->assertSame( $expected, Generator::normalize_text( $input ) );
	}

	/**
	 * Data provider for HTML entity decoding cases.
	 *
	 * @return array
	 */
	public function provider_html_entities() {
		return array(
			'numeric apostrophe' => array( 'It&#8217;s fine', 'It’s fine' ),
			'named ampersand'    => array( 'R&amp;D', 'R&D' ),
			'named copyright'    => array( '&copy; 2026', '© 2026' ),
			'no entity'          => array( 'plain text', 'plain text' ),
		);
	}

	/**
	 * Invalid UTF-8 byte sequences must be stripped before rendering.
	 */
	public function test_normalize_text_strips_invalid_utf8() {
		$input  = "valid\xC3\x28text"; // 0xC3 0x28 is an invalid UTF-8 sequence.
		$result = Generator::normalize_text( $input );

		$this->assertTrue( mb_check_encoding( $result, 'UTF-8' ) );
		$this->assertStringContainsString( 'valid', $result );
		$this->assertStringContainsString( 'text', $result );
	}

	/**
	 * Classic double-encoded mojibake must be repaired back to the original UTF-8.
	 *
	 * @dataProvider provider_mojibake_repairs
	 *
	 * @param string $broken   Mojibake string.
	 * @param string $expected Expected repaired text.
	 */
	public function test_normalize_text_repairs_known_mojibake( $broken, $expected ) {
		$this->assertSame( $expected, Generator::normalize_text( $broken ) );
	}

	/**
	 * Data provider for known mojibake → original mappings.
	 *
	 * @return array
	 */
	public function provider_mojibake_repairs() {
		return array(
			'resume'    => array( 'RÃ©sumÃ©', 'Résumé' ),
			'enye'      => array( 'EspaÃ±a', 'España' ),
			'cent sign' => array( 'Â¢100', '¢100' ),
		);
	}

	/**
	 * Legitimate accented text that happens to contain marker characters
	 * must not be mangled by the heuristic repair.
	 *
	 * @dataProvider provider_legitimate_accents
	 *
	 * @param string $text Already-correct UTF-8 string.
	 */
	public function test_normalize_text_does_not_break_legitimate_accents( $text ) {
		$this->assertSame( $text, Generator::normalize_text( $text ) );
	}

	/**
	 * Data provider for legitimate accented strings that must not change.
	 *
	 * @return array
	 */
	public function provider_legitimate_accents() {
		return array(
			'french cafe'        => array( 'Café' ),
			'portuguese station' => array( 'Avaliação' ),
			'french stick'       => array( 'bâton' ),
			'lone capital a hat' => array( 'Â' ),
			'vietnamese can tho' => array( 'Cần Thơ' ),
		);
	}

	/**
	 * Filter `sharing_image_repair_mojibake` must disable heuristic repair.
	 */
	public function test_normalize_text_respects_repair_filter() {
		add_filter( 'sharing_image_repair_mojibake', '__return_false' );

		// Without repair, decoding pipeline still runs but mojibake stays as-is.
		$this->assertSame( 'RÃ©sumÃ©', Generator::normalize_text( 'RÃ©sumÃ©' ) );
	}

	/**
	 * Filter must receive the text being normalized as the second argument.
	 */
	public function test_repair_filter_receives_text_argument() {
		$captured = null;

		add_filter(
			'sharing_image_repair_mojibake',
			function ( $enabled, $text ) use ( &$captured ) {
				$captured = $text;
				return $enabled;
			},
			10,
			2
		);

		Generator::normalize_text( 'sample input' );

		$this->assertSame( 'sample input', $captured );
	}

	/**
	 * Repaired result of repaired input must be stable (idempotent).
	 */
	public function test_normalize_text_is_idempotent() {
		$once  = Generator::normalize_text( 'RÃ©sumÃ©' );
		$twice = Generator::normalize_text( $once );

		$this->assertSame( $once, $twice );
	}

	/**
	 * Multibyte case conversion must use UTF-8 explicitly so it works regardless
	 * of the host-wide mb_internal_encoding default.
	 */
	public function test_prepare_text_layer_uppercases_cyrillic_under_latin_internal_encoding() {
		$this->previous_internal_encoding = mb_internal_encoding();
		mb_internal_encoding( 'ISO-8859-1' );

		$layer = array(
			'type'        => 'text',
			'dynamic'     => 'dynamic',
			'sample'      => 'привет',
			'textconvert' => 'uppercase',
		);

		$result = $this->invoke_private_method(
			Generator::class,
			'prepare_text_layer',
			array( $layer, array(), 'layer-key', 'settings' )
		);

		$this->assertSame( 'ПРИВЕТ', $result['content'] );
	}

	/**
	 * Same check for lowercase conversion.
	 */
	public function test_prepare_text_layer_lowercases_cyrillic_under_latin_internal_encoding() {
		$this->previous_internal_encoding = mb_internal_encoding();
		mb_internal_encoding( 'ISO-8859-1' );

		$layer = array(
			'type'        => 'text',
			'dynamic'     => 'dynamic',
			'sample'      => 'ПРИВЕТ',
			'textconvert' => 'lowercase',
		);

		$result = $this->invoke_private_method(
			Generator::class,
			'prepare_text_layer',
			array( $layer, array(), 'layer-key', 'settings' )
		);

		$this->assertSame( 'привет', $result['content'] );
	}

	/**
	 * Normalization must run before textconvert, so entity-encoded titles
	 * get decoded and then uppercased correctly.
	 */
	public function test_prepare_text_layer_normalizes_before_textconvert() {
		$layer = array(
			'type'        => 'text',
			'dynamic'     => 'dynamic',
			'sample'      => 'caf&eacute;',
			'textconvert' => 'uppercase',
		);

		$result = $this->invoke_private_method(
			Generator::class,
			'prepare_text_layer',
			array( $layer, array(), 'layer-key', 'settings' )
		);

		$this->assertSame( 'CAFÉ', $result['content'] );
	}

	/**
	 * Fieldset values must override sample content and pass through entity decoding.
	 */
	public function test_prepare_text_layer_decodes_entities_from_fieldset() {
		$layer = array(
			'type'    => 'text',
			'dynamic' => 'dynamic',
			'sample'  => 'fallback',
		);

		$result = $this->invoke_private_method(
			Generator::class,
			'prepare_text_layer',
			array( $layer, array( 'layer-key' => 'It&#8217;s fine' ), 'layer-key', 'post' )
		);

		$this->assertSame( 'It’s fine', $result['content'] );
	}

	/**
	 * Fieldset values must be repaired when they contain pure mojibake.
	 */
	public function test_prepare_text_layer_repairs_mojibake_from_fieldset() {
		$layer = array(
			'type'    => 'text',
			'dynamic' => 'dynamic',
		);

		$result = $this->invoke_private_method(
			Generator::class,
			'prepare_text_layer',
			array( $layer, array( 'layer-key' => 'RÃ©sumÃ©' ), 'layer-key', 'post' )
		);

		$this->assertSame( 'Résumé', $result['content'] );
	}

	/**
	 * Known limitation: when decoded entities introduce code points that map
	 * to Windows-1252 continuation bytes (e.g. U+2019 → 0x92), the heuristic
	 * intentionally bails out instead of risking a destructive conversion.
	 * This test documents that behaviour so a future "improvement" doesn't
	 * silently break it.
	 */
	public function test_normalize_text_skips_repair_when_decoded_text_breaks_round_trip() {
		$mixed = 'It’s mojibake RÃ©sumÃ©';

		$this->assertSame( $mixed, Generator::normalize_text( $mixed ) );
	}

	/**
	 * Utility to call private or protected methods for testing.
	 *
	 * @param string $target_class Fully qualified class name.
	 * @param string $method       Method name.
	 * @param array  $args         Method arguments.
	 *
	 * @return mixed
	 */
	private function invoke_private_method( $target_class, $method, $args = array() ) {
		$reflection = new ReflectionMethod( $target_class, $method );
		$reflection->setAccessible( true );

		return $reflection->invokeArgs( null, $args );
	}
}
