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
                res.send("AuthPass");
            }
            else{
                res.send("AuthFail");
            }
        }
    });
});

router.get('/testpage', auth, function(req, res) {
    res.send('Authenticated!' + req.session.cid);
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
