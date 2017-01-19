var async = require('async');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var dotenv = require('dotenv');

var Customer = require('../models/Customer');
var ruleset = require('../ruleSet/index');
// Load environment variables from .env file
dotenv.load();

/**
 * GET /customers
 * get all evaluated customers
 */
exports.getCustomerScore = function(req, res, next) {

  Customer.find({}, function(err, rows) {
    if (!rows || err) return res.status(500).send({ msg: 'Something went wrong' });

    var customers = [];

    async.eachSeries(rows, function(customer, nextCustomer){
      // console.log(Array.isArray(customer.accounts));
      // console.log(customer);
      console.log(customer.hasOwnProperty('name'));
      // for (var i in customer) {
      //   console.log(i);
      //   // // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
      //   // if (obj.hasOwnProperty(i)) {
      //   //   result += objName + "." + i + " = " + obj[i] + "\n";
      //   // }
      // }
      // var transactionData = {
      //   accountBalance: 30000,
      //   spending: 10000,
      //   age: 27,
      //   employmentSeniority: 'CXO',
      //   companySize: 2,
      //   income: 4000
      // };
      //
      // ruleset.calc(transactionData, function (result) {
      //   customer.evaluation = result;
      //
        customers.push(customer);

        return nextCustomer();
      // });
    }, function (err) {
      if(err) return res.status(500).send({ msg: 'Something went wrong' });
// console.log(customers[0].getOwnPropertyNames());

      return res.send({ customers: customers });
    });
  });
};

/**
 * POST /customers/comment
 * Add comment to customer profile
 */
exports.addComment = function(req, res, next) {
  req.assert('id', 'Customer id cannot be blank').notEmpty();
  req.assert('comment', 'Comment is not valid').notEmpty();

  var errors = req.validationErrors();

  if (errors) return res.status(400).send(errors);

  var comment = req.body.comment;

  Customer.findById(req.params.id, function(err, customer) {
    if (!customer || err) return res.status(401).send({ msg: 'The customer id is not associated with any account. Double-check your customer id and try again.' });

    customer.comments.push({
      comments: comment,
      posted: new Date()
    });

    customer.save(function (err, result) {
      if (err) return res.status(500).send({ msg: 'Something went wrong' });

      return res.send({ customer: customer, msg: 'Comment added.' });
    });
  });
};

/**
 * POST /customers/status
 * Add status to customer profile
 */
exports.addStatus = function(req, res, next) {
  req.assert('id', 'Customer id cannot be blank').notEmpty();
  req.assert('status', 'Status is not valid').notEmpty();

  var errors = req.validationErrors();

  if (errors) return res.status(400).send(errors);

  var status = req.body.status;

  Customer.findById(req.params.id, function(err, customer) {
    if (!customer || err) return res.status(401).send({ msg: 'The customer id is not associated with any account. Double-check your customer id and try again.' });

    customer.status = {
      status: status,
      posted: new Date()
    };

    customer.save(function (err, result) {
      if (err) return res.status(500).send({ msg: 'Something went wrong' });

      return res.send({ customer: customer, msg: 'Status updated.' });
    });
  });
};
