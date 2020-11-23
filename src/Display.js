import React from 'react';

class Display extends React.Component {
  render() {
    // get variables from props
    let { displayOp, output } = this.props;

    return (
      <div id='display' className='display'>
        {/* if new expression, display nothing,
          else display operation */}
        <p id='display-op' className='display'>
          {displayOp.length === 0 ? null : displayOp}
        </p>
        {/* .display-ev shows current input or result */}
        <p id='display-ev' className='display'>
          {output}
        </p>
      </div>
    );
  }
}

export default Display;
