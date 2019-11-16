var express = require('express');
var router = express.Router();
var Chatting = require('../models/chatting');
var ReturnFormat = require('../return_form')();

/* GET chatting listing. */
router.get('/', function(req, res, next) {
    Chatting.findAll()
        .then(function(chatting){
                if(!chatting.length) return res.status(404).send(ReturnFormat.get_format(0, chatting, "cannot found"));
                res.send(ReturnFormat.get_format(1, chatting, ""));
            }
        )
        .catch(function (err) {
                res.status(500).send(ReturnFormat.get_format(0, "", err));
        }
        );
});


/* Get particular chatting*/
router.get('/:chatting_id', function(req, res, next){
    Chatting.find({_id : req.params.chatting_id})
        .then(function(chatting){
            if(!chatting.length) return res.status(404).send(ReturnFormat.get_format(0, chatting, "cannot found"));
            res.send(ReturnFormat.get_format(1, chatting, ""));
        })
        .catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
        });
});






/* Get particular chatting*/
router.get('/customer/:customer_id', function(req, res, next){
    Chatting.find({customer_id : req.params.customer_id})
        .then(function(chatting){
            if(!chatting.length) return res.status(404).send(ReturnFormat.get_format(0, chatting, "cannot found"));
            res.send(ReturnFormat.get_format(1, chatting, ""));
        })
        .catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
        });
});


/* Get particular chatting*/
router.get('/buddy/:buddy_id', function(req, res, next){
    Chatting.find({buddy_id : req.params.buddy_id})
        .then(function(chatting){
            if(!chatting.length) return res.status(404).send(ReturnFormat.get_format(0, chatting, "cannot found"));
            res.send(ReturnFormat.get_format(1, chatting, ""));
        })
        .catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
        });
});

/* Create chatting or update */
router.post('/', function(req, res){
    Chatting.create(req.body)
        .then(function(chatting){
            res.send(ReturnFormat.post_format(1, [chatting], ""));
        }).catch(function(err){
        res.status(500).send(ReturnFormat.post_format(0, "", err));
    });
});


router.put('/:chatting_id', function (req, res) {
    Chatting.updateMany({_id : req.params.chatting_id}, {$set:req.body})
        .then(function(chatting){
            res.send(ReturnFormat.put_format(1, chatting, ""));
        }) .catch(function(err){
        res.status(500).send(ReturnFormat.put_format(0,"", err));
    });
});



/* Delete chatting */
router.delete('/:chatting_id', function(req, res){
    Chatting.remove({chatting_id : req.params.chatting_id})
        .then(function(){
            res.send(ReturnFormat.delete_format(1, ""));
        }).catch((function (err) {
        res.status(500).send(ReturnFormat.delete_format(0, err));
    }))
});

module.exports = router;
