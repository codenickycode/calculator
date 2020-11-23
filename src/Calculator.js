import React from 'react';
import Buttons from './Buttons.js';
import Display from './Display.js';
import { evaluate } from './evaluate.js';

console.clear();

const MAX_INPUT_LENGTH = 14;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.INITIAL_STATE();
    this.buttonClick = this.buttonClick.bind(this);
  }

  INITIAL_STATE = () => ({
    start: true,
    newOperand: true,
    decimal: false,
    decPlace: 0,
    operating: false,
    isNeg: false,
    currentOperand: 0,
    operation: [0],
    operationDisplay: [],
    output: '0',
    toRepeat: [],
  });

  INITIALIZE = () => this.setState(this.INITIAL_STATE());

  buttonClick(input) {
    // get all the current values from state
    let {
      start,
      newOperand,
      decimal,
      decPlace,
      operating,
      isNeg,
      currentOperand,
    } = this.state;
    // don't mutate state directly
    let operation = [...this.state.operation];
    let operationDisplay = [...this.state.operationDisplay];
    let toRepeat = [...this.state.toRepeat];

    // if we previously converted to a string to
    // add decimal place zeros for display,
    // convert it back to a number
    currentOperand = parseFloat(currentOperand);

    switch (input) {
      // ********* AC / BACKSPACE / DEL ********* //
      case 'clear':
        // re-initialize state
        this.INITIALIZE();
        break;

      // ********* ENTER / = ********* //
      case 'Enter':
        if (start) {
          break;
        }
        if (newOperand) {
          // if we have something to repeat
          if (toRepeat.length === 3) {
            // set that to the current operation
            operation = [...toRepeat];
          } else {
            // otherwise, do nothing
            break;
          }
        } else if (operating) {
          // drop extra operator at end of operation
          operation.pop();
        } else {
          // push currentOperand to operation
          operation.push(currentOperand);
        }
        // save last part for repeat
        toRepeat = operation.slice(-2);
        // let the evaluation begin!
        console.time('evaluation');
        let evaluation = evaluate(...operation);
        console.timeEnd('evaluation');
        // re-initialize state
        this.INITIALIZE();
        if (evaluation === 'dbz') {
          this.setState({ output: 'ERROR: DIVIDE BY ZERO' });
          break;
        } else if (evaluation === 'max') {
          this.setState({ output: 'ERROR: > MAX' });
          break;
        } else {
          // convert back to Number from Decimal
          evaluation = Number(evaluation);
          // carry over evaluation and toRepeat operation
          // display the evaluation as output
          this.setState({
            start: false,
            operation: [evaluation],
            operationDisplay: [...operation, '=', evaluation],
            output: evaluation,
            toRepeat: [evaluation, ...toRepeat],
          });
        }
        break;

      // ********* NUMBERS ********* //
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (
          currentOperand.toString().length >= MAX_INPUT_LENGTH ||
          decPlace >= MAX_INPUT_LENGTH
        ) {
          break;
        }
        if (newOperand) {
          // clear carried over operation
          this.setState({ start: false, newOperand: false, operation: [] });
        }
        // convert to int
        let inputInt = parseInt(input);
        // if we changed sign
        if (isNeg) {
          // flip it
          inputInt *= -1;
        }
        // if we're adding decimal places
        if (decimal) {
          // add one
          decPlace++;
          inputInt /= Math.pow(10, decPlace);
        } else {
          // otherwise move over for input
          currentOperand *= 10;
        }
        // add input in 1s place
        currentOperand += inputInt;
        if (decimal) {
          // add 0s
          currentOperand = currentOperand.toFixed(decPlace);
        }
        // continue creating the currentOperand
        this.setState({
          start: false,
          newOperand: false,
          decPlace: decPlace,
          operating: false,
          currentOperand: currentOperand,
          operationDisplay: [...operation, currentOperand],
          output: currentOperand,
        });
        break;

      // ********* DECIMAL ********* //
      case '.':
        if (currentOperand.toString().length > MAX_INPUT_LENGTH) {
          break;
        }
        if (newOperand) {
          // clear carried over operation
          this.setState({ start: false, newOperand: false, operation: [] });
        }
        if (!decimal) {
          // operand will now add decimal places
          this.setState({
            decimal: true,
            operating: false,
            currentOperand: currentOperand,
            output: currentOperand + '.',
          });
          break;
        } else {
          // otherwise, do nothing
          break;
        }

      // ********* OPERATORS ********* //
      case '*':
      case '/':
      case '+':
      case '-':
        // if we're just newOperanding out,
        if (newOperand && input === '-' && operation.length !== 1) {
          // it's a sign change (-)
          this.setState({ start: false, isNeg: true, output: input });
          break;
        }
        // if there's already an operator
        if (operating) {
          if (input === '-') {
            // minus is now a sign change
            this.setState({ isNeg: true, output: input });
            break;
          }
          // but the other operators will just take over
          // by removing the previous operator
          operation.pop();
          // and adding to the operation
          operation.push(input);
          // but if we're not operating,
        } else {
          // and we've carried over a previous result,
          if (newOperand && operation.length === 1) {
            // add just the inputed operator (no extra 0)
            operation.push(input);
            newOperand = false;
          } else {
            // push both currentOperand and inputed operator
            operation.push(currentOperand, input);
          }
        }
        // now we're 'operating'
        this.setState({
          start: false,
          newOperand: newOperand,
          decimal: false,
          decPlace: 0,
          operating: true,
          isNeg: false,
          currentOperand: 0,
          operation: [...operation],
          operationDisplay: [...operation],
          output: input,
          toRepeat: [],
        });
        break;

      // this should never happen
      default:
        console.log('default');
    }
  }

  render() {
    let displayOp = this.state.operationDisplay;
    // chop the leading 0 if it wasn't added explicitly
    if (displayOp.length === 2 && displayOp[0] === 0 && !isNaN(displayOp[1])) {
      displayOp.shift(0);
    }
    // convert to string
    displayOp = displayOp.toString();
    // remove all commas
    displayOp = displayOp.replaceAll(',', ' ');

    return (
      <>
        <Display
          start={this.state.start}
          newOperand={this.state.newOperand}
          operating={this.state.operating}
          displayOp={displayOp}
          output={this.state.output}
        />
        <Buttons click={this.buttonClick} />
      </>
    );
  }
}

export default Calculator;
