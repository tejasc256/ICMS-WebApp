var express = require('express');
var router = express.Router();
var sql = require('../model/db');

var auth = function(req, res, next) {
    if(req.session){
        return next();
    }
    else{
        res.send("AuthFail");
    }
};

router.post('/customer', function(req, res) {
    sql.query("select cid from customer_login where email = ? and password = ?", [req.body.email, req.body.password], function(err, result) {
        if(err){
            throw err;
            console.log(err);
        }
        else{
            if(result.length == 1){
                console.log(result[0].cid);
                req.session.cid = result[0].cid;
                req.session.customer = true;
                res.send("AuthPass");
            }
            else{
                res.send("AuthFail");
            }
        }
    });
});

router.post('/agent', function(req, res) {
    sql.query("select agent_id from agent_login where email = ? and password = ?", [req.body.email, req.body.password], function(err, result) {
        if(err){
            throw err;
            console.log(err);
        }
        else{
            if(result.length == 1){
                console.log(result[0].agent_id);
                req.session.agent_id = result[0].agent_id;
                req.session.agent = true;
                res.send("AuthPass");
            }
            else{
                res.send("AuthFail");
            }
        }
    });
});

router.post('/investigator', function(req, res) {
    sql.query("select inv_id from investigator_login where email = ? and password = ?", [req.body.email, req.body.password], function(err, result) {
        if(err){
            throw err;
            console.log(err);
        }
        else{
            if(result.length == 1){
                console.log(result[0].inv_id);
                req.session.inv_id = result[0].inv_id;
                req.session.investigator = true;
                res.send("AuthPass");
            }
            else{
                res.send("AuthFail");
            }
        }
    });
});

router.post('/manager', function(req, res) {
    sql.query("select mgr_id from manager_login where email = ? and password = ?", [req.body.email, req.body.password], function(err, result) {
        if(err){
            throw err;
            console.log(err);
        }
        else{
            if(result.length == 1){
                console.log(result[0].mgr_id);
                req.session.mgr_id = result[0].mgr_id;
                req.session.manager = true;
                res.send("AuthPass");
            }
            else{
                res.send("AuthFail");
            }
        }
    });
});

router.post('/ceo', function(req, res) {
    if(req.body.email === 'ceo@ccicc.com'){
        if(req.body.password === 'ceo'){
            req.session.ceo_id = 1;
            req.session.ceo = true;
            res.send("AuthPass");
        }
        else{
            res.send("AuthFail");
        }
    }
    else{
        res.send("AuthFail");
    }
});

router.get('/testpage', auth, function(req, res) {
    if(req.session.customer){
        res.send('Customer');
    }
    else if(req.session.agent){
        res.send('Agent ' + req.session.agent_id);
    }
    else if(req.session.investigator){
        res.send('Investigator ' + req.session.inv_id);
    }
    else if(req.session.manager){
        res.send('Manager ' + req.session.mgr_id);
    }
    else if(req.session.ceo){
        res.send('CEO');
    }
    else{
        res.send("AuthFail");
    }

});

router.get('/logout', function(req, res) {
    req.session.destroy(err => {
        if(err){
            return console.log(err);
        }
        res.send("logged out");
    });
});


module.exports = router;
