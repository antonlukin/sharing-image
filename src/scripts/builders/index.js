import buildElement from './element.js';
import buildControl from './control.js';
import buildLayer from './layer.js';
import buildMedia from './media.js';

import buildInput from './input.js';
import buildTextarea from './textarea.js';
import buildCheckbox from './checkbox.js';
import buildRadio from './radio.js';
import buildSelect from './select.js';

const Build = {
	element: buildElement,
	control: buildControl,
	layer: buildLayer,
	checkbox: buildCheckbox,
	media: buildMedia,
	input: buildInput,
	textareal: buildTextarea,
	radio: buildRadio,
	select: buildSelect,
};

export default Build;
