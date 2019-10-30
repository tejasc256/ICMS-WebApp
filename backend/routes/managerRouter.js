var express = require('express');
var router = express.Router();

var sql = require('../model/db');

var auth = function(req, res, next) {
    if(req.session.manager){
        return next();
    }
    else{
        res.send("AuthFail");
    }
};

router.get('/profile', auth, function(req, res) {
    sql.query("select * from manager where mgr_id = ?", req.session.mgr_id, function(err, result) {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

router.delete('/:mgr_id', auth, function(req, res) {
    sql.query('delete from manager where mgr_id = ?; delete from manager_login where mgr_id = ?', [req.params.mgr_id, req.params.mgr_id], function(err ,result) {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

router.post('/changebranch', auth, function(req, res) {
    sql.query("update agent set branch = ? where agent_id = ?", [req.body.branch, req.body.agent_id], function(err, result) {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
});

router.post('/create/agent', auth, function(req, res) {
    sql.query("call CreateAgent(?,?,?,?,?,?,?)", [req.body.email, req.body.password, req.body.firstname, req.body.lastname, req.body.commission, req.body.branch, req.session.mgr_id],
        function(err, result) {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
    });
})

// Code for procedure for manager create

// delimiter //
// create procedure CreateManager(in mem varchar(255),in mps varchar(255),in mfn varchar(255),in mln varchar(255),in mbr varchar(255))
// begin
// declare var int 
// insert into manager_login(email,password) values (mem,mps);
// select mgr_id into var from manager_login where email=mem;
// insert into manager values (var,mfn,mln,mbr);
// end //

router.post('/create', auth, function(req, res) {
    sql.query('call CreateManager(?,?,?,?,?,?,?)', [req.body.email, req.body.password, req.body.firstname, req.body.lastname,req.body.branch], function(err , result) {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

router.get('/', auth , function(req, res) {
    sql.query("select * from agent where mgr_id = ?", req.session.mgr_id, function(err , result) {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});




module.exports = router;
