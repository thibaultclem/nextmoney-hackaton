import React, { Component, View, Text } from 'react';
import Account from './Account';

export default class FinancialDetail extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {

    var accountNodes = this.props.accounts ?
    this.props.accounts.map(function(account) {
      return (
        <Account
          key={account.account_key}
          account={account}
          />
      );
    })
    : null;

    return (
      <div className="row customer-financial-detail">
        {accountNodes}
      </div>
);
}
}
