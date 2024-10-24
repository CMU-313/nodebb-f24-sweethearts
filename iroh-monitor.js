'use strict';

require('iroh');

// Asked co-pilot for a function to monitor the execution time of a function and log it to the console.
function monitorFunction(fn, name) {
	console.log(`Setting up monitoring for ${name}`);

	return async function monitored(...args) {
		console.log(`[START] ${name}`);
		const start = process.hrtime();

		try {
			const result = await fn.apply(this, args);
			const [seconds, nanoseconds] = process.hrtime(start);
			const milliseconds = (seconds * 1000) + (nanoseconds / 1000000);

			console.log(`[END] ${name} took ${milliseconds.toFixed(2)}ms`);

			if (milliseconds > 100) {
				console.warn(`[SLOW] ${name} took ${milliseconds.toFixed(2)}ms`);
			}

			return result;
		} catch (error) {
			console.error(`[ERROR] ${name}:`, error);
			throw error;
		}
	};
}

module.exports = {
	monitorFunction: monitorFunction,
};
