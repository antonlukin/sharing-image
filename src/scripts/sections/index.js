import createCatalog from './catalog.js';
import createEditor from './editor.js';
import createPicker from './picker.js';

const Section = {
	catalog: createCatalog,
	editor: createEditor,
	picker: createPicker,
};

export default Section;
