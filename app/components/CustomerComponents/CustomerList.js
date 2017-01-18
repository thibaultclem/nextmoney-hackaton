import React, { Component, View, Text } from 'react';
import Customer from './Customer';

export default class CustomerList extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    // Filter the customer list
    var customers = [];
    this.props.customers.forEach((customer) => {
      if (
        // Filter on the customer name
        (customer.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) || (customer.status.type === 'uninterested' && this.props.interestedOnly)
      )
      {
        return;
      } else {
        customers.push(<Customer key={customer._id} customer={customer}/>);
      }
    });

    return (
      <div className="customerList">
        {customers}
      </div>
    );
  }
}
