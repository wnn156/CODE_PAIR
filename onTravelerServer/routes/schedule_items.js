var express = require('express');
var router = express.Router();
var ScheduleItem = require('../models/schedule');
var ReturnFormat = require('../return_form')();



router.get('/', function(req, res, next){
    ScheduleItem.findAll()
        .then(function(schedule_item){
            if(!schedule_item.length) return res.status(404).send(ReturnFormat.get_format(0,schedule_item,"cannot found"));
            res.send(ReturnFormat.get_format(1,schedule_item,""));
        }).catch(function (err) {
        res.send(500).send(ReturnFormat.get_format(0, "", err));
    });
});



/* Get particular schedule_item*/
router.get('/:schedule_item_id', function(req, res, next){
    ScheduleItem.find({_id : req.params.schedule_item_id})
        .then(function(schedule_item){
            if(!schedule_item.length) return res.status(404).send(ReturnFormat.get_format(0,schedule_item,"cannot found"));
            res.send(ReturnFormat.get_format(1,schedule_item,""));
        }).catch(function (err) {
            res.send(500).send(ReturnFormat.get_format(0, "", err));
    });
});


router.get('/buddy/:buddy_id', function(req, res, next){
    ScheduleItem.find({buddy_id : req.params.buddy_id})
        .then(function(schedule_item){
            if(!schedule_item.length) return res.status(404).send(ReturnFormat.get_format(0,schedule_item,"cannot found"));
            res.send(ReturnFormat.get_format(1,schedule_item,""));
        }).catch(function (err) {
        res.send(500).send(ReturnFormat.get_format(0, "", err));
    });
});


/* Create schedule_item or update */
router.post('/', function(req, res){
    ScheduleItem.create(req.body)
        .then(function(schedule_item){
            res.send(ReturnFormat.post_format(1, [schedule_item], ""));
        }).catch(function(err){
            res.send(500).status(ReturnFormat.post_format(0, "", err));
    });
});


router.put('/:schedule_id', function (req, res) {
    ScheduleItem.updateMany({_id : req.params.schedule_id}, {$set:req.body})
        .then(function(schedule){
            res.send(ReturnFormat.put_format(1, schedule, ""));
        }) .catch(function(err){
        res.status(500).send(ReturnFormat.put_format(0,"", err));
    });
});



/* Delete schedule_item */
router.delete('/:schedule_item_id', function(req, res){
    ScheduleItem.remove({_id : req.params.schedule_item_id})
        .then(function () {
            res.send(ReturnFormat.delete_format(1, ""));
        }).catch(function (err) {
            res.status(500).send(ReturnFormat.delete_format(0, err));
    });
});

module.exports = router;
