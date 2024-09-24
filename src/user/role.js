const User = require.main.require('./src/user');
const db = require.main.require('./src/database');
const groups = require.main.require('./src/groups');
const meta = require.main.require('./src/meta');
const utils = require.main.require('./src/utils');
const plugins = require.main.require('./src/plugins');
const slugify = require.main.require('./src/slugify');

const roleOptions = ['Professor', 'TA', 'Student', 'Guest'];

// I want to create a dropdown menu for the user to select their role using roleOptions
User.createRoleDropdown = async function (uid) {
    const userData = await User.getUserFields(uid, ['role']);
    const role = userData.role || 'Guest';
    const roleOptions = ['Professor', 'TA', 'Student', 'Guest'];
    return roleOptions.map(option => ({
        value: option,
        selected: role === option,
    }));
};

// I want to save this role in the user's profile
User.updateRole = async function (uid, role) {
    await User.setUserField(uid, 'role', role);
};

// I want to display this role in the user's profile
User.createProfileField = async function (uid) {
    const userData = await User.getUserFields(uid, ['role']);
    return {
        role: userData.role || 'Guest',
    };
};

// I want to display this role in the user's posts
// I want to display this role in the user's profile card
// I want to display this role in the user's profile page
User.addRoleData = async function (data) {
    const role = await User.getUserFields(data.uid, ['role']);
    data.role = role;
    return data;
};


