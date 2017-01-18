var async = require('async');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var Customer = require('../models/Customer');

/**
 * GET /customers
 * get all evaluated customers
 */
exports.getCustomerScore = function(req, res, next) {

  Customer.find({ }, function(err, rows) {
    if (!rows || err) return res.status(500).send({ msg: 'Something went wrong' });

    var customers = [];

    async.eachSeries(rows, function(customer, nextCustomer){

      customers.push(customer);
      return nextCustomer();
      // request({
      //   method: 'GET',
      //   uri: 'http://service.com/upload',
      // }, function (err, response, body) {
      //
      // });
    }, function (err) {
      if(err) return res.status(500).send({ msg: 'Something went wrong' });

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
  req.assert('comment', 'comment is not valid').notEmpty();

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
