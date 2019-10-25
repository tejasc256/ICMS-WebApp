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

router.post('/:claim_id',auth, function(req, res) {
    sql.query("insert into investigates values (?,?)", [req.session.inv_id, req.body.claim_id], function(err , result) {
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