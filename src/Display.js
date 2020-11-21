import React from 'react';

class Display extends React.Component {
  render() {
    let { start, operating, operation, output, toRepeat } = this.props;
    let displayOp = operation.toString();
    displayOp = displayOp.replace(/,/g, '');
    if (!operating) {
      displayOp = displayOp.concat(output);
    }
    let repeatDisplay = toRepeat.slice(1, 3);
    repeatDisplay.unshift('x');

    return (
      <div id='display' className='display'>
        <div id='display-top' className='display'>
          {toRepeat.length === 3 ? (
            <p id='display-rpt' className='display'>
              {repeatDisplay}
            </p>
          ) : (
            <p id='display-rpt' className='display'></p>
          )}

          {operation.length === 0 ? (
            <p id='display-op' className='display'></p>
          ) : start ? (
            <p id='display-op' className='display'>
              {operation}
            </p>
          ) : (
            <p id='display-op' className='display'>
              {displayOp}
            </p>
          )}
        </div>
        <p id='display-ev' className='display'>
          {output}
        </p>
      </div>
    );
  }
}

export default Display;
