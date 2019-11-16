var express = require('express');
var router = express.Router();
var Profile = require('../models/profile');
var ReturnFormat = require('../return_form')();

var multer = require('multer');
var upload = multer({
    storage : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/images')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }),
    dest : "uploads/images"
});


/* GET profile_item listing. */
router.get('/', function(req, res, next) {
    Profile.findAll()
        .then(function(profile){
            if(!profile.length) return res.status(404).send(ReturnFormat.get_format(0,profile,"cannot found"));
            res.send(ReturnFormat.get_format(1,profile,""));
        }).catch(function (err) {
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});


/* Get particular profile_item*/
router.get('/:profile_id', function(req, res, next){
    Profile.find({_id : req.params.profile_item_id})
        .then(function(profile){
            if(!profile.length) return res.status(404).send(ReturnFormat.get_format(0,profile,"cannot found"));
            res.send(ReturnFormat.get_format(1,profile,""));
        }).catch(function (err) {
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});


router.get('/buddy/:buddy_id', function(req, res, next){
    Profile.find({buddy_id : req.params.buddy_id})
        .then(function(profile){
            if(!profile.length) return res.status(404).send(ReturnFormat.get_format(0,profile,"cannot found"));
            res.send(ReturnFormat.get_format(1,profile,""));
        }).catch(function (err) {
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});



/* Create profile_item or update */
router.post('/', upload.single('image'),function(req, res){

    var new_profile_item = {
        buddy_id : req.body.buddy_id,
        image_path : 'images/' + req.file.originalname
    };

    Profile.create(new_profile_item)
        .then(function(profile){
            res.send(ReturnFormat.post_format(1, [profile], ""));
        }).catch(function (err) {
        res.status(500).send(ReturnFormat.post_format(0, "", err));
    });
});


router.put('/:profile_item_id', upload.single('image'), function (req, res) {

    req.body['image_path'] = 'images/' + req.file.originalname;

    Profile.updateMany({_id : req.params.profile_item_id}, {$set:req.body})
        .then(function(profile_item){
            res.send(ReturnFormat.put_format(1, profile_item, ""));
        }) .catch(function(err){
        res.status(500).send(ReturnFormat.put_format(0,"", err));
    });
});


/* Delete profile_item */
router.delete('/:profile_item_id', function(req, res){
    Profile.remove({_id : req.params.profile_item_id})
        .then(function () {
            res.send(ReturnFormat.delete_format(1, ""));
        }).catch(function (err) {
        res.status(500).send(ReturnFormat.delete_format(0, err));
    });
});

module.exports = router;
