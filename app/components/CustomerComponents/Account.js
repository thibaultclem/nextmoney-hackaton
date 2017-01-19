import React, { Component, View, Text } from 'react';
import { BarChart, Bar, XAxis } from 'Recharts';

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

    var categoriesArray = [];

    const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300}];

    for (var key in category) {
      if (category.hasOwnProperty(key)) {
        categoriesArray.push({name: key, value: category[key]});
      }
    }

    console.log(categoriesArray)

    var balance = this.props.account.balance > 0 ? <p className="amount-good">{this.props.account.balance+' '+this.props.account.currency}</p> : <p className="amount-bad">{this.props.account.balance+' '+this.props.account.currency}</p>

    return (

      <div className="account">
        <div className="row no-margin">
            <div className="row">
              <div className="col-sm-8 account-bank">
                <h3>{this.props.account.bank_name} - {this.props.account.description}</h3>
              </div>
              <div className="col-sm-4 text-right">
                {balance}
              </div>
            </div>
            <div className="row">
              <BarChart width={500} height={250} data={categoriesArray}>
                <XAxis dataKey="name" />
                <Bar dataKey="value" fill="#222237" />
              </BarChart>
            </div>
          </div>
      </div>
);
}
}
