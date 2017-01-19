import React, { Component, View, Text } from 'react';
import CustomerNotes from '../Notes/CustomerNotes';
import FinancialDetail from './FinancialDetail';

export default class CustomerDetail extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var mapImg = "https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=200x100&key=AIzaSyB70k8nBeJf8Cp_z_KSdTn3ge7qoi0OtJY&center="+this.props.customer.address+' '+this.props.customer.zip+' '+this.props.customer.city+"&marker="+this.props.customer.address+' '+this.props.customer.zip+' '+this.props.customer.city
    return (
      <div className="row customer-detail">
        <div className="col-sm-3">
          <h2>ADDITONAL INFORMATION</h2>
            <p>
              <a href={this.props.customer.fbData.url} target="_blank"><img src="../img/facebook-icon.png"/></a>{' '}
              <a href={this.props.customer.linkedInData.url}  target="_blank"><img src="../img/linkedin-icon.png"/></a>
            </p>
          <p><img src="../img/country.png"/> {this.props.customer.nationality}</p>
          <p><img src="../img/birthday.png"/> {this.props.customer.dob}</p>
          <p>
            <img src="../img/house.png"/>{this.props.customer.address}, {this.props.customer.zip} {this.props.customer.city}<br />
        <img src={mapImg}/>
      </p>
    </div>
    <div className="col-sm-2">
      <h2>ACTION</h2>
      <p>
        <button type="submit" className="btn btn-success btn-block">Interesting Prospect</button>
        <button type="submit" className="btn btn-warning btn-block">Uninteresting Prospect</button>
      </p>
      <h2>NOTES</h2>
      <CustomerNotes />
    </div>
    <div className="col-sm-7">
      <h2>FINANCIAL DETAILS</h2>
        <FinancialDetail
          accounts={this.props.customer.accounts}
          wealthData={this.props.customer.otherData.subcat} />
    </div>
  </div>
);
}
}

// <CustomerNotes
//   comments={this.props.customer.comments} />
