import React, { Stylesheet } from 'react';

export default class CustomerHeader extends React.Component {

  constructor(props) {
    super(props);
    this.handleClik = this.handleClik.bind(this);
  }

  handleClik(e) {
    this.props.onClick(e);
  }

  render() {
    switch (this.props.customer.status) {
      case 'prospect':
        var classHeadingStatus = "panel-heading customer-status customer-status-investigate";
        var textHeadingStatus = 'To investigate';
        break;
      case 'interested':
        var classHeadingStatus = "panel-heading customer-status customer-status-interesting";
        var textHeadingStatus = 'Interesting customer';
        break;
      case 'notInterested':
        var classHeadingStatus = "panel-heading customer-status customer-status-not-interesting";
        var textHeadingStatus = "Not Interesting customer";
        break;
      default:
        var classHeadingStatus = "panel-heading customer-status customer-status-investigate";
        var textHeadingStatus = 'To investigate';
    };
    return (
      <div className="CustomerHeader" onClick={this.handleClik}>
        <div className={classHeadingStatus}>
          <div>{textHeadingStatus}</div>
        </div>
      </div>
    );
  }
}
