import React from 'react';
import { connect } from 'react-redux';
import Messages from './Messages';
import CustomerList from './CustomerComponents/CustomerList';
import CustomerSearchBar from './CustomerComponents/CustomerSearchBar';
import { fetchCustomer } from '../actions/customer';

class CustomerContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      interestedOnly: false
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(filterText, interestedOnly) {
    this.setState({
      filterText: filterText,
      interestedOnly: interestedOnly
    });
  }

  componentDidMount() {
    this.props.dispatch(fetchCustomer(this.props.token));
  }

  render() {
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages}/>
        <div className="row customerContainer">
          <div className="col-sm-10 col-sm-offset-1">
            <div className="row">
                <CustomerSearchBar
                  filterText={this.state.filterText}
                  interestedOnly={this.state.interestedOnly}
                  onUserInput={this.handleUserInput}
                  />
            </div>
            <div className="row">
              <CustomerList
                customers={this.props.customers}
                filterText={this.state.filterText}
                interestedOnly={this.state.interestedOnly}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    messages: state.messages,
    customers: state.customers
  };
};

export default connect(mapStateToProps)(CustomerContainer);
