import React from 'react';
import { connect } from 'react-redux';

class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log('rendering <Display/>');

    let { operationDisplay, output } = this.props;
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
      <div id='display' className='display'>
        {/* if new expression, display nothing,
          else display operation */}
        <p id='display-op' className='display'>
          {operationDisplay.length === 0 ? null : operationDisplay}
        </p>
        {/* {output} shows current input or evaluated result */}
        <p id='display-ev' className='display'>
          {output}
        </p>
      </div>
    );
  }
}

const displayProps = (state) => ({
  operationDisplay: state.inputReducer.operationDisplay,
  output: state.inputReducer.output,
});
export const DisplayContainer = connect(displayProps)(Display);
