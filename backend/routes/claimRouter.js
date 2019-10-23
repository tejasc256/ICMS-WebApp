var express = require('express');
var router = express.Router();

var claimController = require('../controller/claimController');

router.get('/', claimController.list_all_claims);
router.post('/', claimController.create_a_claim);

router.get('/:claim_id', claimController.read_a_claim);
router.delete('/:claim_id', claimController.delete_a_claim);

module.exports = router;
