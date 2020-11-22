import React from 'react';

class Display extends React.Component {
  render() {
    // get variables from props
    let { start, operating, operation, output, toRepeat } = this.props;
    // displayOp is for the operation in progress
    // first convert array to string
    let displayOp = operation.toString();
    // remove all commas
    displayOp = displayOp.replace(/,/g, '');
    // adds the current number as it's typed
    if (!operating) {
      displayOp = displayOp.concat(output);
    }
    // show only the operation that will be repeated
    let repeatDisplay = toRepeat.slice(1, 3);

    return (
      <div id='display' className='display'>
        {/* .display-top shows current operations */}
        <div id='display-top' className='display'>
          {/* if we can repeat operation, display it, otherwise nothing */}
          <p id='display-rpt' className='display'>
            {toRepeat.length === 3 ? repeatDisplay : null}
          </p>
          {/* if we're just starting, display nothing,
          else if we're continuing, display carried over operation (start === ture),
          else display operation in progress */}
          <p id='display-op' className='display'>
            {operation.length === 0 ? null : start ? operation : displayOp}
          </p>
        </div>
        {/* .display-ev shows current input or result */}
        <p id='display-ev' className='display'>
          {output}
        </p>
      </div>
    );
  }
}

export default Display;
