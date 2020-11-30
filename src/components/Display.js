import Decimal from 'decimal.js';
import React from 'react';
import { connect } from 'react-redux';

class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log('rendering <Display/>');
    let { output, result } = this.props;
    // chop the leading 0 if it wasn't added explicitly
    if (output.length === 2 && output[0] === 0 && !isNaN(output[1])) {
      output.shift(0);
    }
    output = output.toString();
    output = output.replaceAll(',', ' ');
    let display = output;
    let divId = 'display-op';
    let pId = 'output-op';
    if (result) {
      if (typeof result !== 'string') {
        result = Decimal(
          Decimal(result).toPrecision(9, Decimal.ROUND_HALF_UP)
        ).toDecimalPlaces(9, Decimal.ROUND_HALF_UP);
        if (result > 999999999) {
          result = result.toExponential(3);
        }
        console.log(typeof result);
      }

      display = result.toString();
      divId = 'display-eval';
      pId = 'output-eval';
    }
    // font size
    let width = window.innerWidth;
    let size = 6;
    // small screen media query
    if (width <= 768) {
      size = 18 - display.length * 0.7;
      if (display.length < 7) {
        size = 18;
      }
      if (size < 6) {
        size = 6;
      }
    }
    let sizeRem = size + 'vw';
    let fontSize = { fontSize: sizeRem };
    return (
      <div id={divId} className='display'>
        <p id={pId} className='display' style={fontSize}>
          {display}
        </p>
      </div>
    );
  }
}

const displayProps = (state) => ({
  output: state.inputReducer.output,
  result: state.inputReducer.result,
});
export const DisplayContainer = connect(displayProps)(Display);
