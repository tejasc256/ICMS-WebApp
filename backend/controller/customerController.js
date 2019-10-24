'use strict';

var Customer = require('../model/customerModel');

var sql = require('../model/db');

exports.list_all_customers = function(req, res) {
  Customer.getAllCustomer(function(err, customer) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', customer);
    res.send(customer);
  });
};

exports.create_a_customer = function(req, res) {
  var new_customer = new Customer(req.body);

  console.log(new_customer);
  //handles null error
   if(!new_customer.cid || !new_customer.firstname || !new_customer.lastname ||!new_customer.branch || !new_customer.dob ){

            res.status(400).send({ error:true, message: 'Please provide all information' });

        }
else{

  Customer.createCustomer(new_customer, function(err, customer) {

    if (err)
      res.send(err);
    res.json(customer);
  });
}
};


exports.read_a_customer = function(req, res) {
  Customer.getCustomerById(req.params.cid, function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};


exports.update_a_customer = function(req, res) {
      // console.log(req.params);
      // console.log(req.body);
  Customer.updateById(req.params.cid, req.body.branch, function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};


exports.delete_a_customer = function(req, res) {


  Customer.remove( req.params.cid, function(err, customer) {
    if (err)
      res.send(err);
    res.json({ message: 'Customer successfully deleted' });
  });
};

exports.view_customer_policies = function(req, res) {
    sql.query("select * from policy where pid in (select pid from requests where rid in (select rid from agent_requests) and cid = ?);", req.session.cid, function(err, result) {
        console.log('My Policies');
        if (err){
            res.send(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
};

exports.view_customer_claims = function(req, res) {
    sql.query("select c.claim_id, p.name as pname, c.amount, a.name as aname from claims c inner join policy p on c.pid = p.pid inner join policy_attributes a on a.aid = c.aid where c.cid = ?;", req.session.cid, function(err, result) {
        if(err){
            res.send(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
};
