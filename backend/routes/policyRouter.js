var express = require('express');
var router = express.Router();

var policyController = require('../controller/policyController');

router.get('/', policyController.list_all_policies);
router.post('/', policyController.create_a_policy);

router.get('/:pid', policyController.read_a_policy);
router.delete('/:pid', policyController.delete_a_policy);

module.exports = router;
