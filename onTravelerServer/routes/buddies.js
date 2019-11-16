var express = require('express');
var router = express.Router();
var Buddy = require('../models/buddy');
var ReturnFormat = require('../return_form')();

/* GET buddy listing. */
router.get('/', function(req, res, next) {
    Buddy.findAll()
        .then(function(buddy){
            if(!buddy.length) return res.status(404).send(ReturnFormat.get_format(0, buddy, "cannot found"));
            res.send(ReturnFormat.get_format(1, buddy, ""));
        }
    )
    .catch(function (err) {
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});


/* Get particular buddy*/
router.get('/:buddy_id', function(req, res, next){
    Buddy.find({buddy_id : req.params.buddy_id})
        .then(function(buddy){
            if(!buddy.length) return res.status(404).send(ReturnFormat.get_format(0, buddy, "cannot found"));
            res.send(ReturnFormat.get_format(1, buddy, ""));
        })
        .catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
        });
});


/* Get particular buddy list */
router.get('/location/:location_pos', function(req, res, next){
    pos = req.params.location_pos.split(/[ ,]+/);

    Buddy.find()
        .where('active_location.latitude').equals(pos[0])
        .where('active_location.longitude').equals(pos[1])
        .then(function(buddy){
            if(!buddy.length) return res.status(404).send(ReturnFormat.get_format(0, buddy, "cannot found"));
            res.send(ReturnFormat.get_format(1, buddy, ""));
        })
        .catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
        });
});


/* Create buddy or update */
router.post('/', function(req, res){
    Buddy.create(req.body)
        .then(function(buddy){
            res.send(ReturnFormat.post_format(1, [buddy], ""));
        }).catch(function(err){
            res.status(500).send(ReturnFormat.post_format(0, "", err));
    });
});


router.put('/:buddy_id', function (req, res) {
   Buddy.updateMany({buddy_id : req.params.buddy_id}, {$set:req.body})
       .then(function(buddy){
           res.send(ReturnFormat.put_format(1, buddy, ""));
       }) .catch(function(err){
           res.status(500).send(ReturnFormat.put_format(0,"", err));
   });
});


/* Delete buddy */
router.delete('/:buddy_id', function(req, res){
    Buddy.remove({buddy_id : req.params.buddy_id})
        .then(function(){
            res.send(ReturnFormat.delete_format(1, ""));
        }).catch((function (err) {
            res.status(500).send(ReturnFormat.delete_format(0, err));
    }))
});

module.exports = router;
