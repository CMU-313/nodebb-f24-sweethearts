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
        console.log = (msg) => logOutput.push(msg);

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
        let errorOutput = [];
        const originalError = console.error;
        console.error = (msg) => errorOutput.push(msg);

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

// describe('createNewTag', () => {
//     let originalAddTag;

//     beforeEach(() => {
//         // Backup the original AddTag function
//         originalAddTag = topics.AddTag;
//         // Mock the AddTag method
//         topics.AddTag = (tag) => {
//             if (tag === 'homework' || tag === 'assignment') {
//                 return Promise.resolve(); // Simulate successful creation
//             }
//             return Promise.reject(new Error('Tag already exists')); // Simulate error
//         };
//     });

//     afterEach(() => {
//         // Restore the original AddTag function
//         topics.AddTag = originalAddTag;
//     });

//     it('should create tags successfully', async () => {
//         // Capture console.log output
//         let logOutput = [];
//         const originalLog = console.log;
//         console.log = (msg) => logOutput.push(msg);
        
//         await webserver.createNewTag('homework');
//         await webserver.createNewTag('assignment');

//         assert.strictEqual(logOutput.includes('Tag "homework" successfully created!'), true);
//         assert.strictEqual(logOutput.includes('Tag "assignment" successfully created!'), true);
        
//         // Restore console.log
//         console.log = originalLog;
//     });

//     it('should log an error if the tag already exists', async () => {
//         // Capture console.error output
//         let errorOutput = [];
//         const originalError = console.error;
//         console.error = (msg) => errorOutput.push(msg);
        
//         // Modify AddTag to simulate an error
//         topics.AddTag = () => Promise.reject(new Error('Tag already exists'));
        
//         await webserver.createNewTag('homework');
        
//         assert.strictEqual(errorOutput.includes('Error creating tag: Tag already exists'), true);
        
//         // Restore console.error
//         console.error = originalError;
//     });

//     it('should log an error for invalid input', async () => {
//         // Capture console.error output
//         let errorOutput = [];
//         const originalError = console.error;
//         console.error = (msg) => errorOutput.push(msg);
        
//         // Simulate an invalid input scenario
//         topics.AddTag = (tag) => {
//             if (!tag) {
//                 return Promise.reject(new Error('Invalid tag name'));
//             }
//             return Promise.resolve();
//         };

//         await webserver.createNewTag(null); // Simulating an invalid input

//         assert.strictEqual(errorOutput.includes('Error creating tag: Invalid tag name'), true);
        
//         // Restore console.error
//         console.error = originalError;
//     });
// });
