var express = require('express');
var router = express.Router();
var PostScript = require('../models/post_script');
var ReturnFormat = require('../return_form')();


router.get('/', function(req,res, next){
    PostScript.findAll()
        .then(function(postScript){
            if(!postScript.length) return res.status(404).send(ReturnFormat.get_format(0,postScript,"cannot found"));
            res.send(ReturnFormat.get_format(1,postScript,""));
        }).catch(function(err){
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});


router.get('/buddy/:buddy_id', function(req,res, next){
    PostScript.find({buddy_id: req.params.buddy_id})
        .then(function(postScript){
            if(!postScript.length) return res.status(404).send(ReturnFormat.get_format(0,postScript,"cannot found"));
            res.send(ReturnFormat.get_format(1,postScript,""));
        }).catch(function(err){
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});

router.get('/customer/:customer_id', function(req,res, next){
    PostScript.find({customer_id: req.params.customer_id})
        .then(function(postScript){
            if(!postScript.length) return res.status(404).send(ReturnFormat.get_format(0,postScript,"cannot found"));
            res.send(ReturnFormat.get_format(1,postScript,""));
        }).catch(function(err){
        res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});


router.post('/', function(req, res){
    PostScript.create(req.body)
        .then(function(postScript){
            res.send(ReturnFormat.post_format(1, [postScript], ""));
        })
        .catch(function(err){
            res.status(500).send(ReturnFormat.post_format(0, "", err));
        });
});


router.put('/:post_script_id', function (req, res) {
    PostScript.updateMany({_id : req.params.post_script_id}, {$set:req.body})
        .then(function(post_script){
            res.send(ReturnFormat.put_format(1, post_script, ""));
        }) .catch(function(err){
        res.status(500).send(ReturnFormat.put_format(0,"", err));
    });
});


router.delete('/:postScript_id', function(req,res){
    PostScript.remove({_id : req.params.postScript_id})
        .then(function () {
            res.send(ReturnFormat.delete_format(1, ""));
        }).catch(function (err) {
            res.status(500).send(ReturnFormat.delete_format(0, err));
    });
});


module.exports = router;
