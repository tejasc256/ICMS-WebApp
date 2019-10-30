var express = require('express');
var router = express.Router();

var sql = require('../model/db');

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

router.get('/requestsperpolicychart', function(req, res) {
    sql.query("select pid,count(*) from requests group by pid", function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});
// router.get('/invchart', function(req, res) {
//     sql.query("select inv_id,count(*) from investigates group by inv_id", function(err , result) {
//         if(err){
//             console.log(err);
//             throw err;
//         }
//         else{
//             res.send(result);
//         }
//     });
// });

router.get('/claimsperpolicychart', function(req, res) {
    sql.query("select pid,count(*) from claims group by pid", function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/agentspermanager', function(req, res) {
    sql.query("select mgr_id,count(*) from agent group by mgr_id", function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/claimsperbranch', function(req, res) {
    sql.query("select customer.branch,count(*) from (claims inner join customer on claims.cid = customer.cid) group by customer.branch", function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});


router.get('/claimspercustomer', function(req, res) {
    sql.query("select customer.cid,count(*) from (claims inner join customer on claims.cid = customer.cid) group by customer.cid", function(err , result) {
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

router.get('/profile', function(req ,res){
    
});

router.get('/reports', function(req, res) {
    
});

router.get('/agents', function(req, res) {
    sql.query("select * from agent", function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/investigators', function(req, res) {
    sql.query("select * from investigator", function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/managers', function(req, res) {
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



module.exports = router;