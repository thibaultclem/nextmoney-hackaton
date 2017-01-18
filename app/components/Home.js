import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import Customer from './Customer';

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Customer />
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
