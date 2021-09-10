var jwt = require('jsonwebtoken');
var TokenModel = require('../models/TokenModel.js');


module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            var payload = {};
            var secret = process.env.ACCESS_TOKEN_SECRET
            var options = {
                expiresIn: '15s',
                audience: userId
            }
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(err);
                    // reject(createError.InternalServerError());
                }
                resolve(token);
            })
        });
    },
    verifyAccessToken: (req, res, next) => {
        // var token = req.header('auth-token');
        var token = req.headers['authorization'];
        if (!token) return res.status(401).send('Access Denied');

        try {
            var verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = verified;
            next();
        } catch (err) {
            // res.status(400).send('Invalid Token')
            res.status(400).send(err);
        }
    },
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            var payload = {};
            var secret = process.env.REFRESH_TOKEN_SECRET
            var options = {
                expiresIn: '1y',
                audience: userId
            }
            jwt.sign(payload, secret, options, async (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(err);
                    // reject(createError.InternalServerError());
                }
                try {
                    // Add and update refresh token
                    var checkToken = await TokenModel.getTokenByIdUser(userId);
                    if (!checkToken) {
                        await TokenModel.addToken({
                            idUser: userId,
                            value: token
                        })
                    } else {
                        await TokenModel.updateTokenByIdUser(userId, { value: token });
                    }
                } catch(error) {
                    reject(err);
                }

                resolve(token);
            })
        });
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
                if (err) return reject(err);
                var userId = payload.aud;
                try {
                    var userToken = await TokenModel.getTokenByIdUser(userId);
                    if(refreshToken === userToken.value) {
                        resolve(userId);
                    } else throw '403';
                } catch(error) {
                    reject(error);
                }
            })
        })
    }
}