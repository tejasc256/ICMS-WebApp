'use strict';

var Policy = require('../model/policyModel');

exports.list_all_policies = function(req, res) {
    Policy.getAllPolicy(function(err, policy) {

        console.log('controller')
        if (err)
        res.send(err);
        console.log('res', policy);
        res.send(policy);
    });
};

exports.create_a_policy = function(req, res) {
    var new_policy = new Policy(req.body);

    console.log(new_policy);
    //handles null error

    Policy.createPolicy(new_policy, function(err, policy) {

        if (err)
        res.send(err);
        res.json(policy);
    });

};


exports.read_a_policy = function(req, res) {
    Policy.getPolicyById(req.params.pid, function(err, policy) {
        if (err)
        res.send(err);
        res.json(policy);
    });
};


exports.delete_a_policy = function(req, res) {

    Policy.remove( req.params.pid, function(err, policy) {
        if (err)
        res.send(err);
        res.json({ message: 'Policy successfully deleted' });
    });
};
