var sql = require('./db');

var Policy = function(policy){
    this.pid = policy.pid || null;
    this.name = policy.name;
    this.type = policy.type;
    this.premium = policy.premium;
    this.duration = policy.duration;
}

Policy.createPolicy = function (newPolicy, result){
    sql.query("INSERT INTO policy(name, type, premium, duration) values (?,?,?,?)", [newPolicy.name, newPolicy.type, newPolicy.premium,
        newPolicy.duration], function (err, res) {
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

Policy.getPolicyById = function (policyId, result) {
        sql.query("Select * from policy where pid = ? ", policyId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                    console.log("policy by id found");

                }
            });
};
Policy.getAllPolicy = function (cid, result) {
        if(cid == -1){
            sql.query("Select * from policy", function (err, res) {

                    if(err) {
                        console.log("error: ", err);
                        result(err, null);
                    }
                    else{
                      console.log('policy : ', res);

                     result(null, res);
                    }
                });
        }
        else{
            sql.query("Select * from policy where pid not in (select pid from requests where cid = ?)",cid , function (err, res) {

                    if(err) {
                        console.log("error: ", err);
                        result(err, null);
                    }
                    else{
                      console.log('policy : ', res);

                     result(null, res);
                    }
                });
        }

};
Policy.remove = function(id, result){
     sql.query("DELETE FROM policy WHERE pid = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= Policy;
