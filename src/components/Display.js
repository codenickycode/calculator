import Decimal from 'decimal.js';
import debounce from '../tools/debounce.js';
import React from 'react';

export class Output extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.addEventListener('resize', debounce(this.viewportSize, 150));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.viewportSize, 150));
  }
  viewportSize() {
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    console.log(vw, vh);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  render() {
    // console.log('rendering <Display/>');
    let { output } = this.props;
    // format output to max 14 digits
    if (typeof output !== 'string') {
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

    let size = 20;
    if (
      // mobile portrait or large screens
      window.innerWidth < window.innerHeight ||
      (window.innerWidth > 600 && window.innerheight > 540)
    ) {
      size = 20 - output.length * 0.9;
    } else {
      // mobile landscape
      size = 12 - output.length * 0.65;
      if (size < 4) size = 4;
    }
    let sizeVW = size + 'vw';
    let fontSize = { fontSize: sizeVW };
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
