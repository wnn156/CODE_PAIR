var express = require('express');
var router = express.Router();
var Checklist = require('../models/checklist');
var ReturnFormat = require('../return_form')();

/* GET checklist listing. */
router.get('/', function(req, res, next) {
    Checklist.findAll()
        .then(function(checklist){
            if(!checklist.length) return res.status(404).send(ReturnFormat.get_format(0,checklist,"cannot found"));
            res.send(ReturnFormat.get_format(1,checklist,""));
        }).catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});


/* Get particular checklist*/
router.get('/:checklist_id', function(req, res, next){
    Checklist.find({_id : req.params.checklist_id})
        .then(function(checklist){
            if(!checklist.length) return res.status(404).send(ReturnFormat.get_format(0,checklist,"cannot found"));
            res.send(ReturnFormat.get_format(1,checklist,""));
        }).catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});


/* Get particular checklist list */
router.get('/customer/:customer_id', function(req, res, next){
    Checklist.find({customer_id : req.params.customer_id})
        .then(function(checklist){
            if(!checklist.length) return res.status(404).send(ReturnFormat.get_format(0,checklist,"cannot found"));
            res.send(ReturnFormat.get_format(1,checklist,""));
        }).catch(function(err){
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});


/* Get particular checklist list */
router.get('/buddy/:buddy_id', function(req, res, next){
    Checklist.find({buddy_id : req.params.buddy_id})
        .then(function(checklist){
            if(!checklist.length) return res.status(404).send(ReturnFormat.get_format(0,checklist,"cannot found"));
            res.send(ReturnFormat.get_format(1,checklist,""));
        }).catch(function(err){
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});


router.get('/date/:dates', function(req,res,next){
    var dates = req.params.dates.split(/[ ,]+/);

    var search_start_time = new Date(dates[0]);
    var search_end_time = new Date(dates[1]);

    console.log(search_start_time);
    console.log(search_end_time);

    Checklist.find({
        start_time : {
            "$gte" : search_start_time
        },
        end_time : {
            "$lte" : search_end_time
        }
    }).then(function(checklist){
        if(!checklist.length) return res.status(404).send(ReturnFormat.get_format(0,checklist,"cannot found"));
        res.send(ReturnFormat.get_format(1,checklist,""));
    }).catch(function(err){
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });


});


/* Create checklist or update */
router.post('/', function(req, res){
    Checklist.create(req.body)
        .then(function(checklist){
            res.send(ReturnFormat.post_format(1, [checklist], ""));
        }).catch(function(err){
            res.status(500).send(ReturnFormat.post_format(0, "", err));
    });
});

router.put('/:checklist_id', function (req, res) {
    Checklist.updateMany({_id : req.params.checklist_id}, {$set:req.body})
        .then(function(checklist){
            res.send(ReturnFormat.put_format(1, checklist, ""));
        }) .catch(function(err){
        res.status(500).send(ReturnFormat.put_format(0,"", err));
    });
});



/* Delete checklist */
router.delete('/:checklist_id', function(req, res){
    Checklist.remove({_id : req.params.checklist_id})
        .then(function(){
            res.send(ReturnFormat.delete_format(1, ""));
        }).catch(function(err){
            res.status(500).send(ReturnFormat.delete_format(0, err));
    });
});

module.exports = router;
