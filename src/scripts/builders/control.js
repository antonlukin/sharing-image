import buildElement from './element';

import buildInput from './input';
import buildCheckbox from './checkbox';
import buildRadio from './radio';
import buildSelect from './select';
import buildTextarea from './textarea';

/**
 * Helper to create control.
 *
 * @param {Object} args List of control options.
 */
function buildControl( args ) {
	const control = buildElement( 'div', {
		classes: args.classes || [],
	} );

	if ( args.hasOwnProperty( 'append' ) ) {
		args.append.appendChild( control );
	}

	if ( args.hasOwnProperty( 'prepend' ) ) {
		args.prepend.insertBefore( control, args.prepend.firstChild );
	}

	if ( args.hasOwnProperty( 'label' ) ) {
		buildElement( 'h3', {
			text: args.label,
			append: control,
		} );
	}

	if ( args.hasOwnProperty( 'description' ) ) {
		buildElement( 'p', {
			text: args.description,
			append: control,
		} );
	}

	if ( args.hasOwnProperty( 'fields' ) ) {
		args.fields.forEach( ( field ) => {
			switch ( field.group ) {
				case 'input':
					buildInput( field, control );
					break;

				case 'textarea':
					buildTextarea( field, control );
					break;

				case 'radio':
					buildRadio( field, control );
					break;

				case 'select':
					buildSelect( field, control );
					break;

				case 'checkbox':
					buildCheckbox( field, control );
					break;
			}
		} );
	}

	if ( args.hasOwnProperty( 'help' ) ) {
		buildElement( 'small', {
			text: args.help,
			append: control,
		} );
	}

	return control;
}

export default buildControl;
