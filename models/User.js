var rep = require('./Repository');

exports.addUser = async (o) => {
	return await rep.add('User', o);
}

exports.getUserbyEmail = async (email) => {
	return await rep.fetchbyEmail('User', email);
}