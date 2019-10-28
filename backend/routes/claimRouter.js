var express = require('express');
var router = express.Router();

var claimController = require('../controller/claimController');

var sql = require('../model/db');

var auth = function(req, res, next) {
    if(req.session && req.session.cid){
        return next();
    }
    else{
        res.send("AuthFail");
    }
};

router.post('/create', auth, function(req, res) {
    sql.query("INSERT INTO claims(cid, pid, aid, amount) values (?,?,?,?)", [req.session.cid, req.body.pid, req.body.aid, req.body.amount], function (err, result) {
            if(err){
                console.log("error: ", err);
            }
            else{
                res.send(result);
                console.log('Claim Created');
            }
    });
});

router.get('/:claim_id', claimController.read_a_claim);
router.delete('/:claim_id', claimController.delete_a_claim);

router.get('/', claimController.list_all_claims);
router.post('/', claimController.create_a_claim);



module.exports = router;
