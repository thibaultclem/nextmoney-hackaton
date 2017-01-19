import React, { Component, PropTypes } from 'react';

export default class CustomerSearchBar extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onUserInput(
      this.filterTextInput.value
    );
  }

  render() {
    return (
      <div className="CustomerSearchBar">
        <form>
          <span className="icon"><i className="fa fa-search"></i></span>
          <input
            className="searchInput"
            type="search"
            placeholder="Filter by name..."
            value={this.props.filterText}
            ref={(input) => this.filterTextInput = input}
            onChange={this.handleChange}
            />
          <p></p>
        </form>
      </div>
    );
  }
}

// <p>
//   <input
//     type="checkbox"
//     checked={this.props.interestedOnly}
//     ref={(input) => this.interestedOnlyInput = input}
//     onChange={this.handleChange}
//     />
//   Hide Not Interesting Prospect
// </p>
