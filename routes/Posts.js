var router = require('express').Router();
var { verifyAccessToken } = require('../helpers/jwt_helpers');


router.get('/', verifyAccessToken, (req, res) => {
    // res.json({
    //     posts: {
    //         title: "My title",
    //         decription: "random data you shouldnt accesss"
    //     }
    // });
    res.send(req.user);
});

module.exports = router;