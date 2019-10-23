var express = require('express');
var router = express.Router();

var sql = require('../model/db');

var Request = function(a){
    this.cid =  a.cid;
    this.pid = a.pid;
};

router.get('/', function(req, res) {
    if(req.session && req.session.cid){
        sql.query("select * from policy where pid in (select pid from requests where rid not in (select rid from agent_requests) and cid = ?);", req.session.cid, function(err , result) {
            if(err){
                console.log(err);
                throw err;
            }
            else{
                res.send(result);
            }
        });
    }
    else if(req.session && req.session.agent_id){
        var agentbranch;
        sql.query("select branch from agent where agent_id = ?", req.session.agent_id, function(err, result) {
            if(err){
                console.log(err);
                throw err;
            }
            else{
                agentbranch = result[0].branch;
            }
        });
        sql.query("select * from requests inner join customer using cid where branch=? and rid not in (select rid from agent_requests)", agentbranch, function(err , result) {
            if(err){
                console.log(err);
                throw err;
            }
            else{
                res.send(result);
            }
        });
    }
    else{
        res.status(401);
        res.send("Please login");
    }
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
