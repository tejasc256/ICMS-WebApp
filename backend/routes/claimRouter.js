var express = require('express');
var router = express.Router();

var claimController = require('../controller/claimController');

var auth = function(req, res, next) {
    if(req.session && req.session.cid){
        return next();
    }
    else{
        res.sendStatus(401);
    }
};

router.post('/create', auth, claimController.make_a_claim);
router.get('/', claimController.list_all_claims);
router.post('/', claimController.create_a_claim);
router.get('/make_claim',auth,function(req,res){
    sql.query("insert into claims(cid, pid, aid, amount) values (?,?,?,?)", [req.session.cid,req.params.pid,req.params.aid,req.params.amount], function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
})
router.get('/:claim_id', claimController.read_a_claim);
router.delete('/:claim_id', claimController.delete_a_claim);

module.exports = router;
