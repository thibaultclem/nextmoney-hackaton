import React, { Component, View, Text } from 'react';

export default class CustomerProfile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="customer-profile row">
        <div className="col-sm-3">
          <img src={this.props.customer.imageUrl} width="100" height="100" className="profile"/>
        </div>
        <div className="col-sm-9">
          <h3>{this.props.customer.name}</h3>
          <h5>{this.props.customer.email}</h5>
          <h5>{this.props.customer.mobile}</h5>
        </div>
      </div>
    );
  }
}
