import Decimal from 'decimal.js';
import React from 'react';

export class Output extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('rendering <Display/>');
    let { output } = this.props;
    if (!isNaN(output)) {
      output = Decimal(
        Decimal(output).toPrecision(14, Decimal.ROUND_HALF_UP)
      ).toDecimalPlaces(14, Decimal.ROUND_HALF_UP);
      if (
        output > 99999999999999 ||
        (output < -99999999999999 && output !== 0)
      ) {
        output = output.toExponential(3);
      }
      output = output.toString();
    }
    // font size
    let size = 4;
    if (window.innerWidth < 540 || window.innerHeight <= 540) {
      if (output.length > 1) {
        size = 4 - output.length * 0.15;
      }
    } else if (window.innerWidth < 900 || window.innerHeight < 768) {
      if (output.length > 1) {
        size = 4 - output.length * 0.1;
      }
    }

    let sizeRem = size + 'rem';
    let fontSize = { fontSize: sizeRem };
    console.log(typeof output);
    return (
      <div id='output-div' className='display'>
        <p id='output-p' className='display' style={fontSize}>
          {output}
        </p>
      </div>
    );
  }
}

export class Operation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { operationDisplay } = this.props;
    // chop the leading 0 if it wasn't added explicitly
    if (
      operationDisplay.length === 2 &&
      operationDisplay[0] === 0 &&
      !isNaN(operationDisplay[1])
    ) {
      operationDisplay.shift(0);
    }
    operationDisplay = operationDisplay.toString();
    operationDisplay = operationDisplay.replaceAll(',', ' ');

    return (
      <div id='operation-div' className='display'>
        <p id='operation-p' className='display'>
          {operationDisplay}
        </p>
      </div>
    );
  }
}
