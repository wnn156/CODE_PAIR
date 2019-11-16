var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');
var ReturnFormat = require('../return_form')();

/* GET customer listing. */
router.get('/', function(req, res, next) {
    Customer.findAll()
        .then(function(customer){
            if(!customer.length) return res.status(404).send(ReturnFormat.get_format(0, customer, "not_found"));
            res.send(ReturnFormat.get_format(1, customer, ""));
        })
        .catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
        });
});


/* Get particular customer*/
router.get('/:customer_id', function(req, res, next){
    Customer.find({customer_id : req.params.customer_id})
        .then(function(customer){
            if(!customer.length) return res.status(404).send(ReturnFormat.get_format(0, customer, "not_found"));
            res.send(ReturnFormat.get_format(1, customer, ""));
        })
        .catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
        });
});


/* Create customer or update */
router.post('/', function(req, res){
    Customer.create(req.body)
        .then(function(customer){
            res.send(ReturnFormat.post_format(1, [customer], ""));
        }).catch(function(err){
            res.status(500).send(ReturnFormat.get_format(0, "", err));
    });
});

router.put('/:customer_id', function (req, res) {
    Customer.updateMany({customer_id : req.params.customer_id}, {$set:req.body})
        .then(function(customer){
            res.send(ReturnFormat.put_format(1, customer, ""));
        }) .catch(function(err){
        res.status(500).send(ReturnFormat.put_format(0,"", err));
    });
});



/* Delete customer */
router.delete('/:customer_id', function(req, res){
    Customer.remove({customer_id: req.params.customer_id})
        .then(function(){
            res.send(ReturnFormat.delete_format(1,""));
        }).catch(function(err){
            res.status(500).send(ReturnFormat.delete_format(0, err));
    });
});

module.exports = router;
