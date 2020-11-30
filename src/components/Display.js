import Decimal from 'decimal.js';
import React from 'react';

export class Output extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('rendering <Display/>');
    let { output } = this.props;
    if (typeof output !== 'string') {
      output = Decimal(
        Decimal(output).toPrecision(9, Decimal.ROUND_HALF_UP)
      ).toDecimalPlaces(9, Decimal.ROUND_HALF_UP);
      if (output > 999999999) {
        output = output.toExponential(3);
      }
      output = output.toString();
    }
    // font size
    let size = 6;
    if (output.length > 5) {
      size = 6 - output.length * 0.25;
    }

    let sizeRem = size + 'rem';
    let fontSize = { fontSize: sizeRem };
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
