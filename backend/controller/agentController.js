'use strict';

var Agent = require('../model/agentModel');

var sql = require('../model/db');

exports.list_all_agents = function(req, res) {
    Agent.getAllAgent(function(err, agent) {

        console.log('controller')
        if (err)
        res.send(err);
        console.log('res', agent);
        res.send(agent);
    });
};


exports.read_a_agent = function(req, res) {
    sql.query("select * from agent where agent_id = ?", req.session.agent_id, function(err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
};


exports.delete_a_agent = function(req, res) {

    Agent.remove( req.params.agent_id, function(err, agent) {
        if (err)
        res.send(err);
        res.json({ message: 'Agent successfully deleted' });
    });
};
