var express = require('express');
var router = express.Router();
var Favorite_feed = require('../models/favorite_feed');
var ReturnFormat = require('../return_form')();

/* GET Favorite_feed listing. */
router.get('/', function(req, res, next) {
    Favorite_feed.findAll()
        .then(function(favorite_feed){
            if(!favorite_feed.length) return res.status(404).send(ReturnFormat.get_format(0, favorite_feed, "not_found"));
            res.send(ReturnFormat.get_format(1, favorite_feed, ""));
        })
        .catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
        });
});


/* Get particular favorite_buddies*/
router.get('/customer/:customer_id', function(req, res, next){
    Favorite_feed.find({customer_id : req.params.customer_id})
        .then(function(favorite_feed){
            if(!favorite_feed.length) return res.status(404).send(ReturnFormat.get_format(0, favorite_feed, "not_found"));
            res.send(ReturnFormat.get_format(1, favorite_feed, ""));
        })
        .catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
        });
});


/* Get particular favorite_buddies*/
router.get('/feed/:feed_id', function(req, res, next){
    Favorite_feed.find({feed_id : req.params.feed_id})
        .then(function(favorite_feed){
            if(!favorite_feed.length) return res.status(404).send(ReturnFormat.get_format(0, favorite_feed, "not_found"));
            res.send(ReturnFormat.get_format(1, favorite_feed, ""));
        })
        .catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
        });
});



/* Create favorite_feed or update */
router.post('/', function(req, res){
    Favorite_feed.create(req.body)
        .then(function(favorite_feed){
            res.send(ReturnFormat.post_format(1, [favorite_feed], ""));
        }).catch(function(err){
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});


router.put('/:favorite_feed_id', function (req, res) {
    Favorite_feed.updateMany({_id : req.params.favorite_feed_id}, {$set:req.body})
        .then(function(favorite_feed){
            res.send(ReturnFormat.put_format(1, favorite_feed, ""));
        }) .catch(function(err){
        res.status(500).send(ReturnFormat.put_format(0,"", err));
    });
});



/* Delete favorite_feed */
router.delete('/:favorite_feed_id', function(req, res){
    Favorite_feed.remove({_id: req.params.favorite_feed_id})
        .then(function(){
            res.send(ReturnFormat.delete_format(1,""));
        }).catch(function(err){
        res.status(500).send(ReturnFormat.delete_format(0, err));
    });
});

module.exports = router;
