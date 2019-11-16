var express = require('express');
var router = express.Router();
var Feed = require('../models/feed');
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


/* GET feed_item listing. */
router.get('/', function(req, res, next) {
    Feed.findAll()
        .then(function(feed){
            if(!feed.length) return res.status(404).send(ReturnFormat.get_format(0,feed,"cannot found"));
            res.send(ReturnFormat.get_format(1,feed,""));
        }).catch(function (err) {
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});



/* Get particular feed_item*/
router.get('/:feed_item_id', function(req, res, next){
    Feed.find({_id : req.params.feed_item_id})
        .then(function(feed){
            if(!feed.length) return res.status(404).send(ReturnFormat.get_format(0,feed,"cannot found"));
            res.send(ReturnFormat.get_format(1,feed,""));
        }).catch(function (err) {
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});


router.get('/buddy/:buddy_id', function(req, res, next){
    Feed.find({buddy_id : req.params.buddy_id})
        .then(function(feed){
            if(!feed.length) return res.status(404).send(ReturnFormat.get_format(0,feed,"cannot found"));
            res.send(ReturnFormat.get_format(1,feed,""));
        }).catch(function (err) {
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});

/* Get particular feed_item */
router.get('/hashtag/:hashtag_name', function(req, res, next){
    var hashtags = req.params.hashtag_name.split(/[ ,]+/);

    Feed.find({hashtag : { $in : hashtags}})
        .then(function (feed) {
            if(!feed.length) return res.status(404).send(ReturnFormat.get_format(0,feed,"cannot found"));
            res.send(ReturnFormat.get_format(1,feed,""));
        }).catch(function (err) {
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});


/* Create feed_item or update */
router.post('/', upload.single('image'),function(req, res){

    var new_feed_item = {
        buddy_id : req.body.buddy_id,
        image_path : 'images/' + req.file.originalname,
        favorite_num : 0,
        picture_taken_location : req.body.picture_taken_location,
        hashtag : req.body.hashtag.split(/[ ,]+/)
    };

    Feed.create(new_feed_item)
        .then(function(feed){
            res.send(ReturnFormat.post_format(1, [feed], ""));
        }).catch(function (err) {
            res.status(500).send(ReturnFormat.post_format(0, "", err));
    });
});


router.put('/:feed_item_id', upload.single('image'), function (req, res) {

    req.body['image_path'] = 'images/' + req.file.originalname;

    Feed.updateMany({_id : req.params.feed_item_id}, {$set:req.body})
        .then(function(feed_item){
            res.send(ReturnFormat.put_format(1, feed_item, ""));
        }) .catch(function(err){
        res.status(500).send(ReturnFormat.put_format(0,"", err));
    });
});


/* Delete feed_item */
router.delete('/:feed_item_id', function(req, res){
    Feed.remove({_id : req.params.feed_item_id})
        .then(function () {
            res.send(ReturnFormat.delete_format(1, ""));
        }).catch(function (err) {
            res.status(500).send(ReturnFormat.delete_format(0, err));
    });
});

module.exports = router;
