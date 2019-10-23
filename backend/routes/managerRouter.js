var express = require('express');
var router = express.Router();

var sql = require('../model/db');

var auth = function(req, res, next) {
    if(req.session && req.session.mgr_id){
        return next();
    }
    else{
        res.sendStatus(401);
    }
};

router.get('/', auth , function(req, res) {
    sql.query("select * from agents where mgr_id = ?", req.session.mgr_id, function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.post('/', function(req, res) {
    sql.query("insert into requests(cid, pid, type) values (?,?,?)", [req.body.cid, req.body.pid, req.body.type], function(err , result) {
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