
var express = require('express');
var router = express.Router();
var Buddy = require('../models/buddy');
var Customer = require('../models/customer');
var ReturnFormat = require('../return_form')();

const passport = require('passport');

/* GET home page. */
router.get('/google', passport.authenticate('google',
    { scope:
        ['profile']}
        )
);


router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth'}),
    function (req, res) {

        /*
        * 없으면 회원가입
        * */

        res.status(200).send(ReturnFormat.auth_format(0, 0, [{user_id : req.user.id, name : req.user.name.familyName + req.user.name.givenName}], ""));
    }
);

module.exports = router;
