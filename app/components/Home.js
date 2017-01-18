import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import CustomerContainer from './CustomerContainer';

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <CustomerContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
