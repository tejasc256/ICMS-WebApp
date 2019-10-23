'use strict';
var sql = require('./db');

//Customer object constructor
var Customer = function(customer){
    this.cid = customer.cid;
    this.firstname = customer.firstname;
    this.lastname = customer.lastname;
    this.dob = customer.dob;
    this.branch = customer.branch;
    this.balance = 0;
};

Customer.createCustomer = function (newCustomer, result) {
        sql.query("INSERT INTO customer(cid, firstname, lastname, dob, branch) values (?,?,?,?,?)", [newCustomer.cid, newCustomer.firstname, newCustomer.lastname,
                                                                                                        newCustomer.dob, newCustomer.branch], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};
Customer.getCustomerById = function (customerId, result) {
        sql.query("Select * from customer where cid = ? ", customerId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};
Customer.getAllCustomer = function (result) {
        sql.query("Select * from customer", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                  console.log('customer : ', res);

                 result(null, res);
                }
            });
};
Customer.updateById = function(id, branch, result){
  sql.query("UPDATE customer SET branch = ? WHERE cid = ?", [branch, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
              result(err, null);
             }
           else{
             result(null, res);
                }
            });
};
Customer.remove = function(id, result){
     sql.query("DELETE FROM customer WHERE cid = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{

                 result(null, res);
                }
            });
};


module.exports= Customer;
