import createCatalog from './catalog.js';
import createEditor from './editor.js';
import createPicker from './picker.js';
import createPremium from './premium.js';

const Section = {
	catalog: createCatalog,
	editor: createEditor,
	picker: createPicker,
	premium: createPremium,
};

export default Section;
