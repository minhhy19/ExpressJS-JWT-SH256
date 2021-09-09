var router = require('express').Router();
var User = require('../models/User.js');
var jwt = require('jsonwebtoken');
var CryptoJS = require('crypto-js');
var { registerValidation, loginValidation } = require('../validation');



// REGISTER
router.post('/register', async (req, res) => {
    // LETS VALIDATE THE DATA BEFORE WE A USER
    var { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    var emailExist = await User.getUserbyEmail(req.body.email);
    if (emailExist) return res.status(400).send('Email already exists')

    // Hash passwords
    var hashedPassword = await CryptoJS.SHA256(req.body.password + process.env.HASH_PASS_USER).toString(CryptoJS.enc.Hex);

    var user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };
    try {
        var saveUser = await User.addUser(user);
        res.send({ userId: saveUser.insertedId });
    } catch (err) {
        res.status(400).send(err);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    // LETS VALIDATE THE DATA BEFORE WE A USER
    var { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the email exist
    var user = await User.getUserbyEmail(req.body.email);
    if (!user) return res.status(400).send('Email is wrong!')
    // PASSWORD IS CORRECT
    var hashedPassword = await CryptoJS.SHA256(req.body.password + process.env.HASH_PASS_USER).toString(CryptoJS.enc.Hex);
    if (hashedPassword !== user.password) return res.status(400).send('Invalid password');


    // Create and assign a token
    var token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;