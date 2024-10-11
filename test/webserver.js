'use strict';

const assert = require('assert');
const webserver = require('./src/webserver'); 
const topics = require('./src/topics/tags'); 
const db = require('./src/database');

describe('createNewTag', () => {
	let originalCreateEmptyTag;

	before(async () => {
		// Clear any existing tags before running the tests
		await db.clearTags(); // Assuming there's a method to clear all tags in the database
	});

	after(async () => {
		// Clean up by clearing tags after tests
		await db.clearTags();
	});

	it('should add "Homework" and "Assignment" tags correctly to the database', async () => {
		// Act: Run the createNewTag function to add default tags
		await webserver.createNewTag();

		// Assert: Check if the tags are added correctly to the database
		const tags = await db.getTags(); // Assuming getTags() returns all tags from the database
		assert.strictEqual(tags.includes('Homework'), true, '"Homework" tag should be in the database');
		assert.strictEqual(tags.includes('Assignment'), true, '"Assignment" tag should be in the database');
	});

	it('should not add tags to invalid forum categories', async () => {
		// Simulate a scenario where the function tries to add tags to an invalid forum category

		// Assuming there's an invalid category check in the createNewTag function, expect no tags to be added in this case
		await db.clearTags(); // Clear tags first to ensure a clean test

		// Act: Run createNewTag with invalid forum categories (this would need to be simulated in the webserver function)
		await webserver.createNewTag({ forumCategory: 'InvalidCategory' });

		// Assert: Check that no tags have been added
		const tags = await db.getTags();
		assert.strictEqual(tags.length, 0, 'No tags should be added for invalid forum categories');
	});
});
