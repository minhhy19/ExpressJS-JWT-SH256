var rep = require('./Repository');

exports.getTokenByIdUser = async (idUser) => {
	return await rep.fetchTokenByIdUser('Token', idUser);
}

exports.addToken = async (o) => {
	return await rep.add('Token', o);
}

exports.updateTokenByIdUser = async (idUser, o) => {
	return await rep.updateTokenByIdUser('Token', idUser, o);
}

exports.deleteTokenByUserId = async (idUser) => {
	return await rep.deleteTokenByUserId('Token', idUser);
}