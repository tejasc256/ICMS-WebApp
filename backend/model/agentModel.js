'use strict';
var sql = require('./db');

var Agent = function(agent){
    this.agent_id = agent.agent_id || null;
    this.firstname = agent.firstname;
    this.lastname = agent.lastname;
    this.commission = agent.commission;
    this.branch = agent.branch;
    this.mgr_id = agent.mgr_id;
};

Agent.getAgentById = function (agentId, result) {
        sql.query("Select * from agent where agent_id = ? ", agentId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};
Agent.getAllAgent = function (result) {
        sql.query("Select * from agent", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                  console.log('agent : ', res);

                 result(null, res);
                }
            });
};

Agent.remove = function(id, result){
     sql.query("DELETE FROM agent WHERE agent_id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= Agent;
