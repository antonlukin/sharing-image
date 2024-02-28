import getSearchParam from './param.js';
import uploadAttachment from './attachment.js';
import intersectDefaults from './defaults.js';
import getUniqueId from './uniqid.js';

const Helper = {
	param: getSearchParam,
	attachment: uploadAttachment,
	defaults: intersectDefaults,
	uniqid: getUniqueId,
};

export default Helper;
