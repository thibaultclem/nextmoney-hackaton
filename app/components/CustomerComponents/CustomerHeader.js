import React, { Stylesheet } from 'react';
import { connect } from 'react-redux';

export default class CustomerHeader extends React.Component {

  constructor(props) {
    super(props);
    this.handleClik = this.handleClik.bind(this);
  }

  handleClik(e) {
    this.props.onClick(e);
  }
  // PROPSECT: className => customer-status-apply
  // interested: className => customer-status-accepted
  // not-interested: className => customer-status-rejected
  render() {
    var classHeadingStatus = "panel-heading customer-status-rejected";
    switch ('prospect') {
      case 'prospect':
        var textHeadingStatus = 'Prospect';
        break;
      case 'interested':
        var textHeadingStatus = this.props.labels.apply;
        break;
      case 'notInterested':
        var textHeadingStatus = this.props.labels.interview;
        break;
      default:
      var textHeadingStatus = this.props.labels.unknown;
    };
    return (
      <div className="CustomerHeader">
        <div className={classHeadingStatus}>
          <div>{textHeadingStatus}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    labels: state.i18n.labels.customer.CustomerHeader
  };
};

connect(mapStateToProps)(CustomerHeader);
