import React from 'react';
import inputReducer from '../inputReducer/inputReducer.js';
import Buttons from './Buttons.js';
import { Output, Operation } from './Display.js';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.INITIAL_STATE();
    this.buttonPress = this.buttonPress.bind(this);
  }
  buttonPress(input) {
    this.setState(inputReducer(input, this.state, this.INITIAL_STATE));
  }

  INITIAL_STATE = () => ({
    newOperand: true, // if false, numerical input builds on currentOperand
    decimal: false, // true when adding decimal places to currentOperand
    decPlace: 0, // current number of decimal places
    operating: false, // true if prev push was an operator (ex: '+', '-', '*', '/')
    isNeg: false, // sign of currentOperand will be negative (ex: input: 9+-3, currentOperand: -3)
    currentOperand: 0, // current operand being built
    operation: [0], // operation to be evaluated (ex: [number, string, number, string, ...])
    operationDisplay: [], // operation formatted for <OperationDisplay />
    output: 0, // current input or evaluation for <Output />
    toRepeat: [], // previous operation to repeat (ex: ['+',1] ['*', 365])
    prevOutput: '0', // previous output
  });

  render() {
    console.clear();
    // console.log('rendering <Calculator/>');
    return (
      <>
        <div id='display'>
          <Operation operationDisplay={this.state.operationDisplay} />
          <Output output={this.state.output} />
        </div>
        <Buttons click={this.buttonPress} />
      </>
    );
  }
}

export default Calculator;
