var express = require('express');
var router = express.Router();

var sql = require('../model/db');

router.get('/', function(req, res) {
    sql.query("select * from manager", function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/policychart', function(req, res) {
    sql.query("select count(*) as count from policy group by type", function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/customerbranchcountchart', function(req, res) {
    sql.query("select branch,count(*) from customer group by branch", function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/requestsperagentchart', function(req, res) {
    sql.query("select agent_id,count(*) from agent_requests group by agent_id", function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/claimsperpolicychart', function(req, res) {
    sql.query("select count(*) from claims group by pid", function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/claimsperinvestigatorchart', function(req, res) {
    sql.query("select inv_id,count(*) from investigates group by inv_id", function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

module.exports = router;