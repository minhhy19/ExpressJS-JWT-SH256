var router = require('express').Router();
var verify = require('./VerifyToken');


router.get('/', verify, (req, res) => {
    // res.json({
    //     posts: {
    //         title: "My title",
    //         decription: "random data you shouldnt accesss"
    //     }
    // });
    res.send(req.user);
});

module.exports = router;