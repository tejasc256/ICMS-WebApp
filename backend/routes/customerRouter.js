var express = require('express');
var router = express.Router();

var customerController = require('../controller/customerController');

var auth = function(req, res, next) {
    if(req.session && req.session.cid){
        return next();
    }
    else{
        res.sendStatus(401);
    }
};

router.get('/policies', auth, customerController.view_customer_policies);

router.get('/', customerController.list_all_customers);
router.post('/', customerController.create_a_customer);

router.get('/:cid', customerController.read_a_customer);
router.put('/:cid', customerController.update_a_customer);
router.delete('/:cid', customerController.delete_a_customer);




module.exports = router;
