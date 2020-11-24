import React from 'react';
import Buttons from './Buttons.js';
import Display from './Display.js';
import calculateInput from './calculateInput';
console.clear();

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.INITIAL_STATE();
    this.buttonClick = this.buttonClick.bind(this);
  }

  INITIAL_STATE = () => ({
    start: true, // true only on app start and after 'clear'
    newOperand: true, // if false, numerical input builds on currentOperand
    decimal: false, // true when adding decimal places to currentOperand
    decPlace: 0, // current number of decimal places
    operating: false, // true if prev push was an operator (ex: '+', '-', '*', '/')
    isNeg: false, // sign of currentOperand will be negative (ex: input: 9+-3, currentOperand: -3)
    currentOperand: 0, // current operand being built
    operation: [0], // operation to be evaluated (ex: [number, string, number, string, ...])
    operationDisplay: [], // operation formatted for <Display />
    output: '0', // current input or evaluated result
    toRepeat: [], // previous operation to repeat (ex: ['+',1] ['*', 365])
  });

  buttonClick(input) {
    // console.time('input to output');
    this.setState(calculateInput(input, this.INITIAL_STATE, this.state), () =>
      console.log(this.state)
    );
    // console.timeEnd('input to output');
  }

  render() {
    // console.log('rendering <Calculator/>');

    return (
      <>
        <Display
          start={this.state.start}
          newOperand={this.state.newOperand}
          operating={this.state.operating}
          operationDisplay={this.state.operationDisplay}
          output={this.state.output}
        />
        <Buttons click={this.buttonClick} />
      </>
    );
  }
}

export default Calculator;
