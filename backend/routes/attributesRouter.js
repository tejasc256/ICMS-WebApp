var express = require('express');
var router = express.Router();

var sql = require('../model/db');

router.get('/:pid', function(req, res) {
    sql.query("select policy_attributes.aid, policy_attributes.name, policy_attributes.amount from policy_attributes inner join selected_attributes on selected_attributes.aid = policy_attributes.aid where pid = ?", req.params.pid, function(err, result) {
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
