'use strict';
/**
 * Normalizes our expected stringified form of a function across versions of node
 * @param {Function} fn The function to stringify
 */
function normalizedFunctionString(fn) {
	return fn.toString().replace('function(', 'function (');
}

function insecureRandomBytes(size) {
	const result = new Uint8Array(size);
	for (let i = 0; i < size; ++i) result[i] = Math.floor(Math.random() * 256);
	return result;
}

let randomBytes = insecureRandomBytes;
if (
	typeof window !== 'undefined' &&
	window.crypto &&
	window.crypto.getRandomValues
) {
	randomBytes = (size) => window.crypto.getRandomValues(new Uint8Array(size));
} else {
	try {
		randomBytes = require('crypto').randomBytes;
	} catch (e) {
		// keep the fallback
	}

	// NOTE: in transpiled cases the above require might return null/undefined
	if (randomBytes == null) {
		randomBytes = insecureRandomBytes;
	}
}

function newBuffer(item, encoding) {
	return new Buffer(item, encoding);
}

function allocBuffer() {
	return Buffer.alloc.apply(Buffer, arguments);
}

function toBuffer() {
	return Buffer.from.apply(Buffer, arguments);
}

module.exports = {
	normalizedFunctionString,
	randomBytes,
	allocBuffer: typeof Buffer.alloc === 'function' ? allocBuffer : newBuffer,
	toBuffer: typeof Buffer.from === 'function' ? toBuffer : newBuffer,
};
