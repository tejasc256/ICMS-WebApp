var express = require('express');
var router = express.Router();
var sql = require('../model/db');
var customerController = require('../controller/customerController');
var auth = function(req, res, next) {
    if(req.session && req.session.mgr_id){
        return next();
    }
    else{
        res.sendStatus(401);
    }
};

router.get('/', customerController.list_all_customers);
router.post('/', customerController.create_a_customer);

router.get('/:cid', customerController.read_a_customer);
router.put('/:cid', customerController.update_a_customer);
router.delete('/:cid', customerController.delete_a_customer);
router.post('/addmoney', auth, function(req, res) {
    sql.query("update customer set balance=balance + ? where cid=?", [req.body.addedmoney,req.session.cid], function(err , result) {
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
