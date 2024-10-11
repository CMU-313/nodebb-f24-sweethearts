'use strict';


const assert = require('assert');
const nconf = require('nconf');
const util = require('util');

const db = require('./mocks/databasemock');
const meta = require('../src/meta');
const user = require('../src/user');
const topics = require('../src/topics');
const categories = require('../src/categories');
const notifications = require('../src/notifications');
const socketNotifications = require('../src/socket.io/notifications');
const groups = require('../src/groups');

const sleep = util.promisify(setTimeout);

describe('Notifications', () => {
	let uid;
	let notification;

	before((done) => {
		user.create({ username: 'poster' }, (err, _uid) => {
			if (err) {
				return done(err);
			}

			uid = _uid;
			done();
		});
	});

	it('should fail to create notification without a nid', (done) => {
		notifications.create({}, (err) => {
			assert.equal(err.message, '[[error:no-notification-id]]');
			done();
		});
	});

	it('should create a notification', (done) => {
		notifications.create({
			bodyShort: 'bodyShort',
			nid: 'notification_id',
			path: '/notification/path',
			pid: 1,
		}, (err, _notification) => {
			notification = _notification;
			assert.ifError(err);
			assert(notification);
			db.exists(`notifications:${notification.nid}`, (err, exists) => {
				assert.ifError(err);
				assert(exists);
				db.isSortedSetMember('notifications', notification.nid, (err, isMember) => {
					assert.ifError(err);
					assert(isMember);
					done();
				});
			});
		});
	});

	it('should return null if pid is same and importance is lower', (done) => {
		notifications.create({
			bodyShort: 'bodyShort',
			nid: 'notification_id',
			path: '/notification/path',
			pid: 1,
			importance: 1,
		}, (err, notification) => {
			assert.ifError(err);
			assert.strictEqual(notification, null);
			done();
		});
	});

	it('should get empty array', (done) => {
		notifications.getMultiple(null, (err, data) => {
			assert.ifError(err);
			assert(Array.isArray(data));
			assert.equal(data.length, 0);
			done();
		});
	});

	it('should get notifications', (done) => {
		notifications.getMultiple([notification.nid], (err, notificationsData) => {
			assert.ifError(err);
			assert(Array.isArray(notificationsData));
			assert(notificationsData[0]);
			assert.equal(notification.nid, notificationsData[0].nid);
			done();
		});
	});

	it('should do nothing', (done) => {
		notifications.push(null, [], (err) => {
			assert.ifError(err);
			notifications.push({ nid: null }, [], (err) => {
				assert.ifError(err);
				notifications.push(notification, [], (err) => {
					assert.ifError(err);
					done();
				});
			});
		});
	});

	it('should push a notification to uid', (done) => {
		notifications.push(notification, [uid], (err) => {
			assert.ifError(err);
			setTimeout(() => {
				db.isSortedSetMember(`uid:${uid}:notifications:unread`, notification.nid, (err, isMember) => {
					assert.ifError(err);
					assert(isMember);
					done();
				});
			}, 2000);
		});
	});

	it('should push a notification to a group', (done) => {
		notifications.pushGroup(notification, 'registered-users', (err) => {
			assert.ifError(err);
			setTimeout(() => {
				db.isSortedSetMember(`uid:${uid}:notifications:unread`, notification.nid, (err, isMember) => {
					assert.ifError(err);
					assert(isMember);
					done();
				});
			}, 2000);
		});
	});

	it('should push a notification to groups', (done) => {
		notifications.pushGroups(notification, ['registered-users', 'administrators'], (err) => {
			assert.ifError(err);
			setTimeout(() => {
				db.isSortedSetMember(`uid:${uid}:notifications:unread`, notification.nid, (err, isMember) => {
					assert.ifError(err);
					assert(isMember);
					done();
				});
			}, 2000);
		});
	});

	it('should not mark anything with invalid uid or nid', (done) => {
		socketNotifications.markRead({ uid: null }, null, (err) => {
			assert.ifError(err);
			socketNotifications.markRead({ uid: uid }, null, (err) => {
				assert.ifError(err);
				done();
			});
		});
	});

	it('should mark a notification read', (done) => {
		socketNotifications.markRead({ uid: uid }, notification.nid, (err) => {
			assert.ifError(err);
			db.isSortedSetMember(`uid:${uid}:notifications:unread`, notification.nid, (err, isMember) => {
				assert.ifError(err);
				assert.equal(isMember, false);
				db.isSortedSetMember(`uid:${uid}:notifications:read`, notification.nid, (err, isMember) => {
					assert.ifError(err);
					assert.equal(isMember, true);
					done();
				});
			});
		});
	});

	it('should not mark anything with invalid uid or nid', (done) => {
		socketNotifications.markUnread({ uid: null }, null, (err) => {
			assert.ifError(err);
			socketNotifications.markUnread({ uid: uid }, null, (err) => {
				assert.ifError(err);
				done();
			});
		});
	});

	it('should error if notification does not exist', (done) => {
		socketNotifications.markUnread({ uid: uid }, 123123, (err) => {
			assert.equal(err.message, '[[error:no-notification]]');
			done();
		});
	});

	it('should mark a notification unread', (done) => {
		socketNotifications.markUnread({ uid: uid }, notification.nid, (err) => {
			assert.ifError(err);
			db.isSortedSetMember(`uid:${uid}:notifications:unread`, notification.nid, (err, isMember) => {
				assert.ifError(err);
				assert.equal(isMember, true);
				db.isSortedSetMember(`uid:${uid}:notifications:read`, notification.nid, (err, isMember) => {
					assert.ifError(err);
					assert.equal(isMember, false);
					socketNotifications.getCount({ uid: uid }, null, (err, count) => {
						assert.ifError(err);
						assert.equal(count, 1);
						done();
					});
				});
			});
		});
	});

	it('should mark all notifications read', (done) => {
		socketNotifications.markAllRead({ uid: uid }, null, (err) => {
			assert.ifError(err);
			db.isSortedSetMember(`uid:${uid}:notifications:unread`, notification.nid, (err, isMember) => {
				assert.ifError(err);
				assert.equal(isMember, false);
				db.isSortedSetMember(`uid:${uid}:notifications:read`, notification.nid, (err, isMember) => {
					assert.ifError(err);
					assert.equal(isMember, true);
					done();
				});
			});
		});
	});

	it('should not do anything', (done) => {
		socketNotifications.markAllRead({ uid: 1000 }, null, (err) => {
			assert.ifError(err);
			done();
		});
	});

	it('should link to the first unread post in a watched topic', async () => {
		const watcherUid = await user.create({ username: 'watcher' });
		const { cid } = await categories.create({
			name: 'Test Category',
			description: 'Test category created by testing script',
		});

		const { topicData } = await topics.post({
			uid: watcherUid,
			cid: cid,
			title: 'Test Topic Title',
			content: 'The content of test topic',
		});
		const { tid } = topicData;

		await topics.follow(tid, watcherUid);

		const { pid } = await topics.reply({
			uid: uid,
			content: 'This is the first reply.',
			tid: tid,
		});

		await topics.reply({
			uid: uid,
			content: 'This is the second reply.',
			tid: tid,
		});
		// notifications are sent asynchronously with a 1 second delay.
		await sleep(3000);
		const notifications = await user.notifications.get(watcherUid);
		assert.equal(notifications.unread.length, 1, 'there should be 1 unread notification');
		assert.equal(`${nconf.get('relative_path')}/post/${pid}`, notifications.unread[0].path, 'the notification should link to the first unread post');
	});

	it('should get notification by nid', (done) => {
		socketNotifications.get({ uid: uid }, { nids: [notification.nid] }, (err, data) => {
			assert.ifError(err);
			assert.equal(data[0].bodyShort, 'bodyShort');
			assert.equal(data[0].nid, 'notification_id');
			assert.equal(data[0].path, `${nconf.get('relative_path')}/notification/path`);
			done();
		});
	});

	it('should get user\'s notifications', (done) => {
		socketNotifications.get({ uid: uid }, {}, (err, data) => {
			assert.ifError(err);
			assert.equal(data.unread.length, 0);
			assert.equal(data.read[0].nid, 'notification_id');
			done();
		});
	});

	it('should error if not logged in', (done) => {
		socketNotifications.deleteAll({ uid: 0 }, null, (err) => {
			assert.equal(err.message, '[[error:no-privileges]]');
			done();
		});
	});

	it('should delete all user notifications', (done) => {
		socketNotifications.deleteAll({ uid: uid }, null, (err) => {
			assert.ifError(err);
			socketNotifications.get({ uid: uid }, {}, (err, data) => {
				assert.ifError(err);
				assert.equal(data.unread.length, 0);
				assert.equal(data.read.length, 0);
				done();
			});
		});
	});

	it('should return empty with falsy uid', (done) => {
		user.notifications.get(0, (err, data) => {
			assert.ifError(err);
			assert.equal(data.read.length, 0);
			assert.equal(data.unread.length, 0);
			done();
		});
	});

	it('should get all notifications and filter', (done) => {
		const nid = 'willbefiltered';
		notifications.create({
			bodyShort: 'bodyShort',
			nid: nid,
			path: '/notification/path',
			type: 'post',
		}, (err, notification) => {
			assert.ifError(err);
			notifications.push(notification, [uid], (err) => {
				assert.ifError(err);
				setTimeout(() => {
					user.notifications.getAll(uid, 'post', (err, nids) => {
						assert.ifError(err);
						assert(nids.includes(nid));
						done();
					});
				}, 3000);
			});
		});
	});

	it('should not get anything if notifications does not exist', (done) => {
		user.notifications.getNotifications(['doesnotexistnid1', 'doesnotexistnid2'], uid, (err, data) => {
			assert.ifError(err);
			assert.deepEqual(data, []);
			done();
		});
	});

	it('should get daily notifications', (done) => {
		user.notifications.getDailyUnread(uid, (err, data) => {
			assert.ifError(err);
			assert.equal(data[0].nid, 'willbefiltered');
			done();
		});
	});

	it('should return empty array for invalid interval', (done) => {
		user.notifications.getUnreadInterval(uid, '2 aeons', (err, data) => {
			assert.ifError(err);
			assert.deepEqual(data, []);
			done();
		});
	});

	it('should return 0 for falsy uid', (done) => {
		user.notifications.getUnreadCount(0, (err, count) => {
			assert.ifError(err);
			assert.equal(count, 0);
			done();
		});
	});

	it('should not do anything if uid is falsy', (done) => {
		user.notifications.deleteAll(0, (err) => {
			assert.ifError(err);
			done();
		});
	});

	it('should send notification to followers of user when he posts', async () => {
		const followerUid = await user.create({ username: 'follower' });
		await user.follow(followerUid, uid);
		const { cid } = await categories.create({
			name: 'Test Category',
			description: 'Test category created by testing script',
		});
		await topics.post({
			uid: uid,
			cid: cid,
			title: 'Test Topic Title',
			content: 'The content of test topic',
		});
		await sleep(1100);
		const data = await user.notifications.getAll(followerUid, '');
		assert(data);
	});

	// New tests for faculty reply notifications
	// Asked help from ChatGPT to generate these tests.
	describe('Faculty Reply Notifications', () => {
		let adminUid;
		let regularUid;
		let cid;
		let tid;

		before(async () => {
			// Create test users
			adminUid = await user.create({ username: 'admin' });
			regularUid = await user.create({ username: 'regular' });

			// Make the admin user a part of the administrators group
			await groups.join('administrators', adminUid);

			// Create test category and topic
			cid = await categories.create({
				name: 'Test Category',
				description: 'Test category created by testing script',
			}).then(category => category.cid);

			tid = await topics.post({
				uid: regularUid,
				cid: cid,
				title: 'Test Topic',
				content: 'This is a test topic',
			}).then(result => result.topicData.tid);
		});

		it('should create a faculty-reply notification when an admin (faculty) replies', async () => {
			console.log('Starting test: should create a faculty-reply notification when an admin (faculty) replies');
			const postData = await topics.reply({
				uid: adminUid,
				tid: tid,
				content: 'This is a faculty reply',
			});

			// Wait for notification to be created
			await sleep(3000);

			const notifs = await db.getSortedSetRange(`uid:${regularUid}:notifications:unread`, 0, -1);
			console.log('Notifications:', notifs);

			const notifData = await db.getObjects(notifs.map(nid => `notifications:${nid}`));
			console.log('Notification Data:', notifData);

			const facultyReplyNotif = notifData.find(n => n.type === 'faculty-reply');

			if (!facultyReplyNotif) {
				console.log('All notification types:', notifData.map(n => n.type));
			}

			assert(facultyReplyNotif, 'Faculty reply notification should exist');
			assert.strictEqual(facultyReplyNotif.bodyShort, `[[notifications:faculty-posted-to, ${postData.user.displayname}, ${postData.topic.title}]]`);
			console.log("Finished test: should create a faculty-reply notification when an admin (faculty) replies");
		});

		it('should not create a faculty-reply notification when a regular user replies', async () => {
			console.log('Starting test: should not create a faculty-reply notification when a regular user replies');
			// Clear existing notifications
			await db.delete(`uid:${regularUid}:notifications:unread`);

			const beforeNotifs = await db.getSortedSetRange(`uid:${regularUid}:notifications:unread`, 0, -1);
			console.log('Notifications before reply:', beforeNotifs);

			const replyData = await topics.reply({
				uid: regularUid,
				tid: tid,
				content: 'This is a regular user reply',
			});
			console.log('Reply data:', replyData);

			// Wait for potential notification to be created
			await sleep(3000);

			const afterNotifs = await db.getSortedSetRange(`uid:${regularUid}:notifications:unread`, 0, -1);
			console.log('Notifications after reply:', afterNotifs);

			const notifData = await db.getObjects(afterNotifs.map(nid => `notifications:${nid}`));
			console.log('Notification Data:', notifData);

			// Log all notification types
			console.log('All notification types:', notifData.map(n => n.type));

			// Check that no new notifications were created
			assert.strictEqual(afterNotifs.length, 0, 'No new notifications should be created for a regular user reply');

			// Logging existing notifications
			if (notifData.length > 0) {
				console.log('Unexpected notifications:', notifData);
			}
			console.log('Finished test: should not create a faculty-reply notification when a regular user replies');
		});

		it('should allow users to mark faculty-reply notifications as read', async () => {
			console.log('Starting test: should allow users to mark faculty-reply notifications as read');
	
			// Clear existing notifications
			await user.notifications.deleteAll(regularUid);
			console.log('Cleared existing notifications for regularUid:', regularUid);
			const isAdmin = await groups.isMember(adminUid, 'administrators');
	
			// Create a faculty reply
			const replyData = await topics.reply({
				uid: adminUid,
				tid: tid,
				content: 'This is another faculty reply to ensure a notification exists',
			});
			console.log('Faculty reply created:', replyData);
	
			// Wait for notification to be created
			await sleep(5000);
	
			// Get all unread notifications
			const notificationIds = await db.getSortedSetRange(`uid:${regularUid}:notifications:unread`, 0, -1);
			console.log('Notification IDs:', notificationIds);
	
			const notificationData = await db.getObjects(notificationIds.map(nid => `notifications:${nid}`));
			console.log('Notification Data:', JSON.stringify(notificationData, null, 2));
	
			// Check for faculty-reply notification
			const facultyReplyNotif = notificationData.find(n => n.nid && n.nid.includes('faculty_post'));
	
			// For debugging purposes
			if (!facultyReplyNotif) {
				console.log('Faculty reply notification not found. Notification types:', notificationData.map(n => n.type));
			} else {
				console.log('Found faculty reply notification:', facultyReplyNotif);
			}
	
			assert(facultyReplyNotif, 'Faculty reply notification should exist');
	
			if (facultyReplyNotif) {
				await socketNotifications.markRead({ uid: regularUid }, facultyReplyNotif.nid);
	
				const updatedNotifications = await db.getSortedSetRange(`uid:${regularUid}:notifications:read`, 0, -1);
				const readFacultyReplyNotif = updatedNotifications.includes(facultyReplyNotif.nid);
	
				assert(readFacultyReplyNotif, 'Faculty reply notification should be marked as read');
			}
	
			console.log('Finished test: should allow users to mark faculty-reply notifications as read');
		});

		it('should allow users to configure faculty-reply notification preferences', async () => {
			console.log('Starting test: should allow users to configure faculty-reply notification preferences');
			await user.setSetting(regularUid, 'notificationType_faculty-reply', 'notification');

			const settings = await user.getSettings(regularUid);
			assert.strictEqual(settings['notificationType_faculty-reply'], 'notification', 'Faculty reply notification preference should be set');
			console.log('Finished test: should allow users to configure faculty-reply notification preferences');
		});

		it('should create multiple faculty-reply notifications for multiple admin replies', async () => {
			console.log('Starting test: should create multiple faculty-reply notifications for multiple admin replies');
			
			// Clear existing notifications
			await user.notifications.deleteAll(regularUid);
		
			// Creating multiple faculty replies
			for (let i = 0; i < 3; i++) {
				await topics.reply({
					uid: adminUid,
					tid: tid,
					content: `This is faculty reply number ${i + 1}`,
				});
			}
		
			// Wait for notifications to be created
			await sleep(5000);
		
			const notificationIds = await db.getSortedSetRange(`uid:${regularUid}:notifications:unread`, 0, -1);
			const notificationData = await db.getObjects(notificationIds.map(nid => `notifications:${nid}`));
		
			const facultyReplyNotifs = notificationData.filter(n => n.nid && n.nid.includes('faculty_post'));
		
			assert.strictEqual(facultyReplyNotifs.length, 3, 'Should have 3 faculty reply notifications');
			console.log('Finished test: should create multiple faculty-reply notifications for multiple admin replies');
		});

		after(async () => {
			// Clean up users, category, and topic
			await Promise.all([
				user.delete(adminUid),
				user.delete(regularUid),
			].map(p => p.catch(() => { /* ignore errors */ })));
			await db.delete(`category:${cid}`);
			await topics.purge(tid);

			// Remove admin from administrators group
			await groups.leave('administrators', adminUid);
		});
	});


	it('should send welcome notification', (done) => {
		meta.config.welcomeNotification = 'welcome to the forums';
		user.notifications.sendWelcomeNotification(uid, (err) => {
			assert.ifError(err);
			user.notifications.sendWelcomeNotification(uid, (err) => {
				assert.ifError(err);
				setTimeout(() => {
					user.notifications.getAll(uid, '', (err, data) => {
						meta.config.welcomeNotification = '';
						assert.ifError(err);
						assert(data.includes(`welcome_${uid}`), data);
						done();
					});
				}, 2000);
			});
		});
	});

	it('should prune notifications', (done) => {
		notifications.create({
			bodyShort: 'bodyShort',
			nid: 'tobedeleted',
			path: '/notification/path',
		}, (err, notification) => {
			assert.ifError(err);
			notifications.prune((err) => {
				assert.ifError(err);
				const month = 2592000000;
				db.sortedSetAdd('notifications', Date.now() - (2 * month), notification.nid, (err) => {
					assert.ifError(err);
					notifications.prune((err) => {
						assert.ifError(err);
						notifications.get(notification.nid, (err, data) => {
							assert.ifError(err);
							assert(!data);
							done();
						});
					});
				});
			});
		});
	});
});
