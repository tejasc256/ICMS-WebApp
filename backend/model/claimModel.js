var sql = require('./db');

var Claim = function(claim){
    this.claim_id = claim.claim_id || null;
    this.cid = claim.cid;
    this.pid = claim.pid;
    this.aid = claim.aid;
    this.amount = claim.amount;
}

Claim.createClaim = function (newClaim, result){
    sql.query("INSERT INTO claims(cid, pid, aid, amount) values (?,?,?,?)", [newClaim.cid, newClaim.pid, newClaim.aid,
        newClaim.amount], function (err, res) {
            if(err){
                console.log("error: ", err);
                result(err,null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
};

Claim.getClaimById = function (claimId, result) {
        sql.query("Select * from claims where claim_id = ? ", claimId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                    console.log("claim by id found");

                }
            });
};
Claim.getAllClaims = function (result) {
        sql.query("select claim_id, cid, p.name as pname, a.name as aname, c.amount from claims c inner join policy p on c.pid = p.pid inner join policy_attributes a on a.aid = c.aid where claim_id not in (select claim_id from investigates);", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                  console.log('claim : ', res);

                 result(null, res);
                }
            });
};
Claim.remove = function(id, result){
     sql.query("DELETE FROM claims WHERE claim_id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= Claim;
