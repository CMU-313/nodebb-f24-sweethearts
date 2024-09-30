
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
		console.log("favorite.js Topics.favorite");
		await db.setAdd(`tid:${tid}:favoriters`, uid);
		await db.sortedSetAdd(`uid:${uid}:favorite_tids`, Date.now(), tid);
	};

	Topics.unfavorite = async function (tid, uid) {
		console.log("favorite.js Topics.unfavorite");
		await db.setRemove(`tid:${tid}:favoriters`, uid);
		await db.sortedSetRemove(`uid:${uid}:favorite_tids`, tid);
	};

	Topics.isFavorited = async function (tid, uid) {
		return await db.isSortedSetMember(`uid:${uid}:favorite_tids`, tid);
	};
};


// module.exports = function (Topics) {
// 	Topics.toggleSaveToFavorites = async function (tid, uid) {
// 		const exists = await Topics.exists(tid);
// 		if (!exists) {
// 			throw new Error('[[error:no-topic]]');
// 		}
// 		const isSavingToFavorites = await Topics.isSavingToFavorites("savers", [tid], uid);
// 		if (isSavingToFavorites[0]) {
// 			await Topics.saveToFavorites(tid, uid);
// 		} else {
// 			await Topics.removeFromFavorites(tid, uid);
// 		}
// 		return !isSavingToFavorites[0];
// 	};

// 	Topics.saveToFavorites = async function (tid, uid) {
// 		await setWatching(saveToFavorites, 'action:topic.save_to_favorites', tid, uid);
// 	};

// 	Topics.removeFromFavorites = async function (tid, uid) {
// 		await setWatching(removeFromFavorites, 'action:topic.remove_from_favorites', tid, uid);
// 	};

// 	async function setWatching(method, hook, tid, uid) {
// 		if (!(parseInt(uid, 10) > 0)) {
// 			throw new Error('[[error:not-logged-in]]');
// 		}
// 		const exists = await Topics.exists(tid);
// 		if (!exists) {
// 			throw new Error('[[error:no-topic]]');
// 		}
// 		await method(tid, uid);
// 		plugins.hooks.fire(hook, { uid: uid, tid: tid });
// 	}

// 	async function saveToFavorites(tid, uid) {
// 		await addToSets(`tid:${tid}:savers`, `uid:${uid}:saved_to_favorites_tids`, tid, uid);
// 	}

// 	async function removeFromFavorites(tid, uid) {
// 		await removeFromSets(`tid:${tid}:savers`, `uid:${uid}:removed_from_favorites_tids`, tid, uid);
// 	}

// 	async function addToSets(set1, set2, tid, uid) {
// 		await db.setAdd(set1, uid);
// 		await db.sortedSetAdd(set2, Date.now(), tid);
// 	}

// 	async function removeFromSets(set1, set2, tid, uid) {
// 		await db.setRemove(set1, uid);
// 		await db.sortedSetRemove(set2, tid);
// 	}

// 	Topics.isSavingToFavorites = async function (set, tids, uid) {
// 		// return await isIgnoringOrFollowing('savers', tids, uid);
// 		if (!Array.isArray(tids)) {
// 			return;
// 		}
// 		if (parseInt(uid, 10) <= 0) {
// 			return tids.map(() => false);
// 		}
// 		const keys = tids.map(tid => `tid:${tid}:${set}`);
// 		return await db.isMemberOfSets(keys, uid);
// 	};

// 	// Topics.getFollowData = async function (tids, uid) {
// 	// 	if (!Array.isArray(tids)) {
// 	// 		return;
// 	// 	}
// 	// 	if (parseInt(uid, 10) <= 0) {
// 	// 		return tids.map(() => ({ following: false, ignoring: false }));
// 	// 	}
// 	// 	const keys = [];
// 	// 	tids.forEach(tid => keys.push(`tid:${tid}:followers`, `tid:${tid}:ignorers`));

// 	// 	const data = await db.isMemberOfSets(keys, uid);

// 	// 	const followData = [];
// 	// 	for (let i = 0; i < data.length; i += 2) {
// 	// 		followData.push({
// 	// 			following: data[i],
// 	// 			ignoring: data[i + 1],
// 	// 		});
// 	// 	}
// 	// 	return followData;
// 	// };

// 	// Topics.getFollowers = async function (tid) {
// 	// 	return await db.getSetMembers(`tid:${tid}:followers`);
// 	// };

// 	// Topics.getIgnorers = async function (tid) {
// 	// 	return await db.getSetMembers(`tid:${tid}:ignorers`);
// 	// };

// 	// Topics.filterIgnoringUids = async function (tid, uids) {
// 	// 	const isIgnoring = await db.isSetMembers(`tid:${tid}:ignorers`, uids);
// 	// 	const readingUids = uids.filter((uid, index) => uid && !isIgnoring[index]);
// 	// 	return readingUids;
// 	// };

// 	// Topics.filterWatchedTids = async function (tids, uid) {
// 	// 	if (parseInt(uid, 10) <= 0) {
// 	// 		return [];
// 	// 	}
// 	// 	const scores = await db.sortedSetScores(`uid:${uid}:followed_tids`, tids);
// 	// 	return tids.filter((tid, index) => tid && !!scores[index]);
// 	// };

// 	// Topics.filterNotIgnoredTids = async function (tids, uid) {
// 	// 	if (parseInt(uid, 10) <= 0) {
// 	// 		return tids;
// 	// 	}
// 	// 	const scores = await db.sortedSetScores(`uid:${uid}:ignored_tids`, tids);
// 	// 	return tids.filter((tid, index) => tid && !scores[index]);
// 	// };

// 	// Topics.notifyFollowers = async function (postData, exceptUid, notifData) {
// 	// 	notifData = notifData || {};
// 	// 	let followers = await Topics.getFollowers(postData.topic.tid);
// 	// 	const index = followers.indexOf(String(exceptUid));
// 	// 	if (index !== -1) {
// 	// 		followers.splice(index, 1);
// 	// 	}

// 	// 	followers = await privileges.topics.filterUids('topics:read', postData.topic.tid, followers);
// 	// 	if (!followers.length) {
// 	// 		return;
// 	// 	}

// 	// 	let { title } = postData.topic;
// 	// 	if (title) {
// 	// 		title = utils.decodeHTMLEntities(title);
// 	// 	}

// 	// 	const notification = await notifications.create({
// 	// 		subject: title,
// 	// 		bodyLong: postData.content,
// 	// 		pid: postData.pid,
// 	// 		path: `/post/${postData.pid}`,
// 	// 		tid: postData.topic.tid,
// 	// 		from: exceptUid,
// 	// 		topicTitle: title,
// 	// 		...notifData,
// 	// 	});
// 	// 	notifications.push(notification, followers);
// 	// };
// };
