import getSearchParam from './param.js';
import uploadAttachment from './attachment.js';
import intersectDefaults from './defaults.js';
import getUniqueId from './uniqid.js';
import getElement from './dataget.js';

const Helper = {
	param: getSearchParam,
	attachment: uploadAttachment,
	defaults: intersectDefaults,
	uniqid: getUniqueId,
	dataget: getElement,
};

export default Helper;
