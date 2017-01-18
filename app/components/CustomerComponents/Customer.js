import React, { Component, View, Text } from 'react';
import CustomerHeader from './CustomerHeader';
import CustomerProfile from './CustomerProfile';

export default class Customer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="job">
        <div className="panel panel-default customer">
          <CustomerHeader customer={this.props.customer}/>
          <div className="row">
            <div className="col-sm-4">
              <CustomerProfile customer={this.props.customer} />
            </div>
            <div className="col-sm-4">
              INFO
            </div>
            <div className="col-sm-4">
              INDEX
            </div>
          </div>
        </div>
      </div>
    );
  }
}
