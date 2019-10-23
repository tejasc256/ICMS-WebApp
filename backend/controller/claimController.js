'use strict';

var Claim = require('../model/claimModel');

var sql = require('../model/db');

exports.list_all_claims = function(req, res) {
    Claim.getAllClaims(function(err, claim) {

        console.log('controller')
        if (err)
        res.send(err);
        console.log('res', claim);
        res.send(claim);
    });
};

exports.create_a_claim = function(req, res) {
    var new_claim = new Claim(req.body);

    console.log(new_claim);
    //handles null error

    Claim.createClaim(new_claim, function(err, claim) {

        if (err)
        res.send(err);
        res.json(claim);
    });

};


exports.read_a_claim = function(req, res) {
    Claim.getClaimById(req.params.claim_id, function(err, claim) {
        if (err)
        res.send(err);
        res.json(claim);
    });
};


exports.delete_a_claim = function(req, res) {

    Claim.remove( req.params.claim_id, function(err, claim) {
        if (err)
        res.send(err);
        res.json({ message: 'Claim successfully deleted' });
    });
};

exports.make_a_claim = function(req, res) {
    sql.query('insert into claims(cid, pid, aid, amount) values(?,?,?,?)', [req.session.cid, req.body.pid, req.body.aid, req.body.amount], function(err, result) {
        if(err){
            console.log(err);
            throw err;
        }
        else{
            res.json(result.insertId);
        }
    });
}
