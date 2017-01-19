import React, { Component, View, Text } from 'react';


export default class Account extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    var category = {}; // create an empty array
    var totalExpense = 0;

    if (this.props.account.transactions) {
      this.props.account.transactions.map(function(transaction) {
        category[transaction.original_category] ?
          category[transaction.original_category] = category[transaction.original_category] + transaction.amount
          : category[transaction.original_category] = transaction.amount;
        totalExpense = totalExpense + transaction.amount;
      })
    };

    console.log(category)
    console.log(totalExpense)

    for (var key in category) {
      if (category.hasOwnProperty(key)) {
        console.log(category[key]/totalExpense);
      }
    }

    return (

      <div className="account">
        <div className="row">
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-4 account-bank">
                <h3>{this.props.account.bank_name}</h3>
              </div>
              <div className="col-sm-8 right">
                {this.props.account.balance+' '+this.props.account.currency}
              </div>
            </div>
            <div className="row">
            </div>
          </div>
          <div className="col-sm-6">
            List
          </div>
        </div>
      </div>
);
}
}
