import createCatalog from './catalog.js';
import createEditor from './editor.js';
import createConfig from './config.js';
import createPremium from './premium.js';
import createPicker from './picker.js';

const Section = {
	catalog: createCatalog,
	editor: createEditor,
	config: createConfig,
	premium: createPremium,
	picker: createPicker,
};

export default Section;
