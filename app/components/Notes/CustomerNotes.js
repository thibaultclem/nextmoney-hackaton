import React from 'react';
import NewNote from './NewNote';

export default class CustomerNotes extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="CustomerNote">
        <NewNote />
      </div>
    );
  }
}
