var express = require('express');
var router = express.Router();

var agentController = require('../controller/agentController');

var sql = require('../model/db');

var auth = function(req, res, next) {
    if(req.session && req.session.agent_id){
        return next();
    }
    else{
        res.send("AuthFail");
    }
};

router.get('/profile', auth, agentController.read_a_agent);
router.get('/fulfill/:rid',auth, function(req, res) {
    sql.query("insert into agent_requests values (?,?)", [req.session.agent_id, req.params.rid], function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.delete('/:agent_id', agentController.delete_a_agent);

router.get('/', agentController.list_all_agents);




module.exports = router;
