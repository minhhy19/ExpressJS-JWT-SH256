var router = require('express').Router();
var authController = require('../controllers/Auth.Controller');



router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/refresh-token', authController.refreshToken);

router.delete('/logout', authController.logout);

module.exports = router;