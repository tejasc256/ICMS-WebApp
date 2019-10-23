var express = require('express');
var router = express.Router();

var agentController = require('../controller/agentController');

router.get('/', agentController.list_all_agents);
router.post('/', agentController.create_a_agent);

router.get('/:agent_id', agentController.read_a_agent);
router.delete('/:agent_id', agentController.delete_a_agent);


module.exports = router;
