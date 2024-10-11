'use strict';

const assert = require('assert');
const webserver = require('../src/webserver');
const topics = require('../src/topics/tags');
const db = require('../src/database');

// Automated test cases generated with the help of ChatGPT

describe('createNewTag', () => {
	let originalCreateEmptyTag;

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
		await topics.deleteTags(['Homework', 'Assignment']);

		// Act: Run createNewTag with invalid forum categories (this would need to be simulated in the webserver function)
		await topics.createNewTag({ forumCategory: 'InvalidCategory' });

		// Assert: Check that no tags have been added
		const tags = await topics.getTags(0, -1);
		assert.strictEqual(tags.length, 0, 'No tags should be added for invalid forum categories');
	});
});
