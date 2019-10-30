var express = require('express');
var router = express.Router();

var sql = require('../model/db');

var auth = function(req, res, next) {
    if(req.session && req.session.cid){
        return next();
    }
    else{
        res.send("AuthFail");
    }
};

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
        sql.query("select * from requests inner join customer on requests.cid = customer.cid inner join customer_login on customer.cid = customer_login.cid inner join policy on policy.pid = requests.pid where customer.branch = (select branch from agent where agent_id = ?) and rid not in (select rid from agent_requests);", req.session.agent_id, function(err ,result) {
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
        res.send("AuthFail");
    }
});

router.post('/', auth, function(req, res) {

    sql.query('call BuyPolicy(?,?,?, @result); select @result as isSuccess;', [req.session.cid, req.body.pid, req.body.type], function(err ,result) {
        if(err){
            console.log(err);
        }
        else{
            res.send(result[1][0]);
        }
    });

});

module.exports = router;
