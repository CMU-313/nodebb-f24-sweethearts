'use strict';

const assert = require('assert');
const db = require('../database');

const Topics = {};
require('../../src/topics/favorite')(Topics); // Corrected path

describe('Topics', function () {
	let dbCalls;

	beforeEach(function () {
		dbCalls = {
			setAdd: [],
			sortedSetAdd: [],
			setRemove: [],
			sortedSetRemove: [],
			isSortedSetMember: []
		};

		db.setAdd = async (...args) => { dbCalls.setAdd.push(args); };
		db.sortedSetAdd = async (...args) => { dbCalls.sortedSetAdd.push(args); };
		db.setRemove = async (...args) => { dbCalls.setRemove.push(args); };
		db.sortedSetRemove = async (...args) => { dbCalls.sortedSetRemove.push(args); };
		db.isSortedSetMember = async (...args) => { dbCalls.isSortedSetMember.push(args); return false; };
		Topics.exists = async () => true;
	});

	describe('.toggleFavorite()', function () {
		it('should throw an error if topic does not exist', async function () {
			Topics.exists = async () => false;
			try {
				await Topics.toggleFavorite(1, 1);
			} catch (err) {
                assert.strictEqual(err.message, '[[error:no-topic]]');
            }
        });

        it('should unfavorite a topic if already favorited', async function () {
            db.isSortedSetMember = async () => true;
            const result = await Topics.toggleFavorite(1, 1);
            assert.strictEqual(result, false);
            assert.deepStrictEqual(dbCalls.setRemove, [['tid:1:favoriters', 1]]);
            assert.deepStrictEqual(dbCalls.sortedSetRemove, [['uid:1:favorite_tids', 1]]);
        });

        it('should favorite a topic if not already favorited', async function () {
            db.isSortedSetMember = async () => false;
            const result = await Topics.toggleFavorite(1, 1);
            assert.strictEqual(result, true);
            assert.deepStrictEqual(dbCalls.setAdd, [['tid:1:favoriters', 1]]);
            assert.strictEqual(dbCalls.sortedSetAdd.length, 1);
            assert.strictEqual(dbCalls.sortedSetAdd[0][0], 'uid:1:favorite_tids');
            assert.strictEqual(dbCalls.sortedSetAdd[0][2], 1);
        });
    });

    describe('.favorite()', function () {
        it('should add a topic to favorites', async function () {
            await Topics.favorite(1, 1);
            assert.deepStrictEqual(dbCalls.setAdd, [['tid:1:favoriters', 1]]);
            assert.strictEqual(dbCalls.sortedSetAdd.length, 1);
            assert.strictEqual(dbCalls.sortedSetAdd[0][0], 'uid:1:favorite_tids');
            assert.strictEqual(dbCalls.sortedSetAdd[0][2], 1);
        });
    });

    describe('.unfavorite()', function () {
        it('should remove a topic from favorites', async function () {
            await Topics.unfavorite(1, 1);
            assert.deepStrictEqual(dbCalls.setRemove, [['tid:1:favoriters', 1]]);
            assert.deepStrictEqual(dbCalls.sortedSetRemove, [['uid:1:favorite_tids', 1]]);
        });
    });

    describe('.isFavorited()', function () {
        it('should check if a topic is favorited', async function () {
            const result = await Topics.isFavorited(1, 1);
            assert.strictEqual(result, false);
            assert.deepStrictEqual(dbCalls.isSortedSetMember, [['uid:1:favorite_tids', 1]]);
        });
    });
});