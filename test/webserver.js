'use strict';

const assert = require('assert');
const webserver = require('../src/webserver'); // Ensure path is correct
const topics = require('../src/topics/tags'); // Ensure path is correct

describe('createNewTag', () => {
	let originalCreateEmptyTag;
	
	before(() => {
		// Backup the original createEmptyTag function
		originalCreateEmptyTag = topics.createEmptyTag;
	});

	after(() => {
		// Restore the original createEmptyTag function
		topics.createEmptyTag = originalCreateEmptyTag;
	});

	it('should create a tag successfully', async () => {
		// Arrange: Mock createEmptyTag to simulate success
		topics.createEmptyTag = async (tag) => {
			if (tag === 'newTag') {
				return Promise.resolve(); // Simulate successful creation
			}
			throw new Error('Tag already exists');
		};

		// Capture console.log output
		let logOutput = [];
		const originalLog = console.log;
		console.log = msg => logOutput.push(msg);

		// Act
		await webserver.createNewTag('newTag');

		// Assert
		assert.strictEqual(logOutput.includes('Tag "newTag" successfully created!'), true);

		// Restore console.log
		console.log = originalLog;
	});

	it('should handle error when tag already exists', async () => {
		// Arrange: Mock createEmptyTag to simulate an error
		topics.createEmptyTag = async () => {
			throw new Error('Tag already exists'); // Simulate error
		};

		// Capture console.error output
		const errorOutput = [];
		const originalError = console.error;
		console.error = msg => errorOutput.push(msg);

		// Act
		await webserver.createNewTag('existingTag'); // Attempt to create the existing tag

		// Assert
		assert.strictEqual(errorOutput.includes('Error creating tag: Tag already exists'), true);

		// Restore console.error
		console.error = originalError;
	});

	it('should handle invalid tag name', async () => {
		// Act
		const response = await webserver.createNewTag(''); // Test with empty string

		// Assert
		assert.strictEqual(response, 'Error creating tag: Invalid tag name'); // Adjust based on your function's error handling
	});
});
