import { customAlphabet } from 'nanoid';

/**
 * Get unique param on custom alhpabeth.
 */
function getUniqueId() {
	const nanoid = customAlphabet( '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12 );

	return nanoid();
}

export default getUniqueId;
