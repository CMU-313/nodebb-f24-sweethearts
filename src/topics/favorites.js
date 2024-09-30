
'use strict';

const db = require('../database');
const notifications = require('../notifications');
const privileges = require('../privileges');
const plugins = require('../plugins');
const utils = require('../utils');

module.exports = function (Topics) {
	Topics.toggleFavorite = async function (tid, uid) {
		const exists = await Topics.exists(tid);
		if (!exists) {
			throw new Error('[[error:no-topic]]');
		}
		const isFavorited = await Topics.isFavorited(tid, uid);
		if (isFavorited) {
			await Topics.unfavorite(tid, uid);
		} else {
			await Topics.favorite(tid, uid);
		}
		return !isFavorited;
	};

	Topics.favorite = async function (tid, uid) {
		await db.setAdd(`tid:${tid}:favoriters`, uid);
		await db.sortedSetAdd(`uid:${uid}:favorite_tids`, Date.now(), tid);
	};

	Topics.unfavorite = async function (tid, uid) {
		await db.setRemove(`tid:${tid}:favoriters`, uid);
		await db.sortedSetRemove(`uid:${uid}:favorite_tids`, tid);
	};

	Topics.isFavorited = async function (tid, uid) {
		return await db.isSortedSetMember(`uid:${uid}:favorite_tids`, tid);
	};
};