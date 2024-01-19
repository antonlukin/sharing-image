import createCatalog from './catalog.js';
import createEditor from './editor.js';
import createConfig from './config.js';
import createPremium from './premium.js';
import createPicker from './picker.js';
import createTools from './tools.js';

const Section = {
	catalog: createCatalog,
	editor: createEditor,
	config: createConfig,
	premium: createPremium,
	picker: createPicker,
	tools: createTools,
};

export default Section;
