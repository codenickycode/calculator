import React from 'react';

class Display extends React.Component {
  render() {
    return (
      <div id='display'>
        {this.props.operation[0] === 0 ? (
          <p id='display-op'></p>
        ) : (
          <p id='display-op'>{this.props.operation}</p>
        )}
        <p id='display-ev'>{this.props.output}</p>
      </div>
    );
  }
}

export default Display;
