import React, { Component, View, Text } from 'react';
import { connect } from 'react-redux';
import CustomerHeader from './CustomerComponents/CustomerHeader';

export default class Customer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <CustomerHeader
            // status={this.props.job.status[this.props.job.status.length-1]}
            // onClick={(event) => this.handleExpandClik(event, true)}
          />
          <h3>Test User</h3>
          <h3>TestUser@User.com</h3>
        </div>
      </div>
    );
  }
}
