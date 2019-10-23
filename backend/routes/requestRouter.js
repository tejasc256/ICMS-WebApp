var express = require('express');
var router = express.Router();

var sql = require('../model/db');

var Request = function(a){
    this.cid =  a.cid;
    this.pid = a.pid;
};

router.get('/', function(req, res) {
    sql.query("select * from requests", function(err , result) {
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
