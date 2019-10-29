var express = require('express');
var router = express.Router();

var sql = require('../model/db');

var auth = function(req, res, next) {
    if(req.session.investigator || req.session.manager){
        return next();
    }
    else{
        res.send('AuthFail');
    }
};

router.get('/profile', auth, function(req, res) {
    sql.query("select * from investigator where inv_id = ?", req.session.inv_id, function(err, result) {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

router.post('/create', auth, function(req, res) {
    sql.query('call CreateInvestigator(?, ?, ?, ?)', [req.body.email, req.body.password, req.body.firstname, req.body.lastname], function(err , result) {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});


router.get('/all', auth, function(req, res) {
    sql.query('select * from investigator', function(err, result) {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

router.delete('/:inv_id', auth, function(req, res) {
    sql.query('delete from investigator where inv_id = ?; delete from investigator_login where inv_id = ?', [req.params.inv_id, req.params.inv_id], function(err ,result) {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})


router.post('/',auth, function(req, res) {
    sql.query("insert into investigates values (?,?,?)", [req.session.inv_id, req.body.claim_id, req.body.granted], function(err , result) {
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
