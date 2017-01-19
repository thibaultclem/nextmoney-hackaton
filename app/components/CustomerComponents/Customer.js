import React, { Component, View, Text } from 'react';
import CustomerHeader from './CustomerHeader';
import CustomerProfile from './CustomerProfile';
import CustomerDetail from './CustomerDetail';

export default class Customer extends Component {

  constructor(props) {
    super(props);
    this.state= {displayMore: false}
    this.handleExpandClik = this.handleExpandClik.bind(this);
  }

  handleExpandClik(e, header) {
    header ? this.setState({displayMore: !this.state.displayMore}) :  this.setState({displayMore: true})
  }

  render() {
    return (
      <div className="job">
        <div className="panel panel-default customer">
          <CustomerHeader
            customer={this.props.customer}
            onClick={(event) => this.handleExpandClik(event, true)}
            />
          <div className="panel-body" onClick={this.handleExpandClik}>
            <div className="row">
              <div className="col-sm-4">
                <CustomerProfile customer={this.props.customer} />
              </div>
              <div className="col-sm-4">

              </div>
              <div className="col-sm-4">
                INDEX
              </div>
            </div>
            <div className="row">
              { this.state.displayMore ? <CustomerDetail
                customer={this.props.customer}
                /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
