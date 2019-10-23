var express = require('express');
var router = express.Router();

var sql = require('../model/db');

router.get('/', function(req, res) {
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