import getSearchParam from './param.js';
import uploadAttachment from './attachment.js';
import intersectDefaults from './defaults.js';

const Helper = {
	param: getSearchParam,
	attachment: uploadAttachment,
	defaults: intersectDefaults,
};

export default Helper;
