'use strict';

var Customer = require('../model/customerModel');

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
