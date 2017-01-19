var async = require('async');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var dotenv = require('dotenv');

var Customer = require('../models/Customer');
var ruleSet = require('../ruleSet/index');
// Load environment variables from .env file
dotenv.load();

function _calculateAge(birthday) { // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function _calculateSpendingAndSalary(transactions, callback){
  var data = { spendings: 0, income: 0 };
  async.eachSeries(transactions, function (transaction, nextTransaction) {
    var transactionType = transaction.movement;

    if(transactionType == 'credit'){
      var n = transaction.description.indexOf('PAY BY');
      if(n > -1) data.income = Math.abs(transaction.amount) + data.income
    }else if(transactionType == 'debit'){
      data.spendings = Math.abs(transaction.amount) + data.spendings
    }
    return nextTransaction();
  }, function(err){
    return callback(err, data);
  });
}
/**
 * GET /customers
 * get all evaluated customers
 */
exports.getCustomerScore = function(req, res, next) {

  Customer.find({}, function(err, rows) {
    if (!rows || err) return res.status(500).send({ msg: 'Something went wrong' });

    var customers = [];

    async.eachSeries(rows, function(customer, nextCustomer){
      var transactionData = {
        accountBalance: 0,
        spendings: 0,
        income: 0
      };
      async.eachSeries(customer.accounts, function (account, nextAccount) {
        transactionData.accountBalance = account.balance + transactionData.accountBalance;
        transactionData.employmentSeniority = customer.linkedInData.company[0].employmentSeniority;
        transactionData.companySize = customer.linkedInData.company[0].companySize;
        transactionData.age = _calculateAge(new Date(customer.dob));

        _calculateSpendingAndSalary(account.transactions, function (err, data) {
          if(err) return nextAccount(err);

          transactionData.spendings = data.spendings + transactionData.spendings;
          transactionData.income = data.income + transactionData.income;
          return nextAccount();
        });
      }, function (err) {
        if(err) return nextCustomer(err);

        if(transactionData.income === 0) transactionData.income = undefined;
// console.log(transactionData);
        ruleSet.calc(transactionData, function (result) {
          result.score = (result.score + ((customer.linkedInData.company.length - 1) * 0.05));
          customer.otherData = result;
          customers.push(customer);
          return nextCustomer();
        });
      });
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
