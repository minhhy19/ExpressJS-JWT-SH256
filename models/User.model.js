var rep = require('./Repository');

exports.addUser = async (o) => {
	return await rep.add('User', o);
}

exports.getUserByUsername = async (username) => {
	return await rep.fetchByUsername('User', username);
}

exports.getUserById = async (id) => {
	return await rep.fetchOne('User', id);
}