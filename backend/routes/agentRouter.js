var express = require('express');
var router = express.Router();

var agentController = require('../controller/agentController');

var auth = function(req, res, next) {
    if(req.session && req.session.mgr_id){
        return next();
    }
    else{
        res.sendStatus(401);
    }
};

router.get('/', agentController.list_all_agents);
router.post('/', agentController.create_a_agent);

router.get('/:agent_id', agentController.read_a_agent);
router.delete('/:agent_id', agentController.delete_a_agent);

router.post('/fulfill',auth, function(req, res) {
    sql.query("insert into agent-request values (?,?)", [req.session.agent_id, req.body.rid], function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
    sql.query("update agent set commission = commission + ? where aid=?", [req.body.amount, req.session.agent_id], function(err , result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
    sql.query("update customer set balance = balance - ? where cid=?", [req.body.amount, req.body.cid], function(err , result) {
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
