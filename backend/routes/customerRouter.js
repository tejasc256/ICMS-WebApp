var express = require('express');
var router = express.Router();

var customerController = require('../controller/customerController');

router.get('/', customerController.list_all_customers);
router.post('/', customerController.create_a_customer);

router.get('/:cid', customerController.read_a_customer);
router.put('/:cid', customerController.update_a_customer);
router.delete('/:cid', customerController.delete_a_customer);
module.exports = router;
