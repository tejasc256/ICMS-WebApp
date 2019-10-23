var express = require('express');
var router = express.Router();

var auth = function(req, res, next) {
    if(req.session && req.session.mgr_id){
        return next();
    }
    else{
        res.sendStatus(401);
    }
};

var policyController = require('../controller/policyController');
router.get('/buy/:pid',auth,policyController.buy_policy);
router.get('/', policyController.list_all_policies);
router.post('/', policyController.create_a_policy);

router.get('/:pid', policyController.read_a_policy);
router.delete('/:pid', policyController.delete_a_policy);

module.exports = router;
