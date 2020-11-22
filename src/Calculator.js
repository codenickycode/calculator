import React from 'react';
import Buttons from './Buttons.js';
import Display from './Display.js';
import { evaluate } from './evaluate.js';

console.clear();

const INITIAL_STATE = {
  start: true,
  decimal: false,
  decPlace: 0,
  operating: false,
  isNeg: false,
  currentOperand: 0,
  operation: [],
  output: '',
  toRepeat: [],
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(input) {
    // get all the current values from state
    let { start, decimal, decPlace, operating, isNeg, currentOperand, operation, toRepeat } = this.state;

    // if we previously converted to a string to
    // add decimal place zeros for display,
    // convert it back to a number
    currentOperand = parseFloat(currentOperand);

    switch (input) {
      // ********* AC / BACKSPACE / DEL ********* //
      case 'clear':
        // re-initialize state
        this.setState(INITIAL_STATE);
        break;

      // ********* ENTER / = ********* //
      case 'Enter':
        if (start) {
          // if we have a previous result
          if (operation.length === 1) {
            // insert prev result as first operand of toRepeat
            toRepeat.splice(0, 1, operation[0]);
            // and set that to the current operation
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
        // if we have a repeatable operation
        if (operation.length === 3) {
          // save it for later
          toRepeat = [...operation];
        }
        // let the evaluation begin!
        let evaluation = evaluate(operation);

        // ********* TODO ********* //
        // round decimal places

        // re-initialize state
        this.setState(INITIAL_STATE);
        // carry over evaluation and toRepeat operation
        // display the evaluation as output
        this.setState({
          operation: [evaluation],
          output: evaluation,
          toRepeat: toRepeat,
        });
        // console.log(this.state);
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
        if (start) {
          // clear carried over operation
          this.setState({ start: false, operation: [] });
        }
        if (decPlace >= 4) {
          // no smaller, sorry
          break;
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
        // ??
        if (decimal) {
          // I think trying to get rid of precision errors
          currentOperand = currentOperand.toFixed(decPlace);
        }
        // continue creating the currentOperand
        this.setState({
          start: false,
          decPlace: decPlace,
          operating: false,
          currentOperand: currentOperand,
          output: currentOperand,
        });
        break;

      // ********* DECIMAL ********* //
      case '.':
        if (start) {
          // clear carried over operation
          this.setState({ start: false, operation: [] });
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
        // if we're just starting out,
        if (start && input === '-' && operation.length !== 1) {
          // it's a sign change (-)
          this.setState({ isNeg: true, output: input });
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
          if (start && operation.length === 1) {
            // add just the inputed operator (no extra 0)
            operation.push(input);
            start = false;
          } else {
            // push both currentOperand and inputed operator
            operation.push(currentOperand, input);
          }
        }
        // now we're 'operating'
        this.setState({
          start: start,
          decimal: false,
          decPlace: 0,
          operating: true,
          isNeg: false,
          currentOperand: 0,
          operation: operation,
          output: input,
          toRepeat: [],
        });
        break;

      // this should never happen
      default:
        console.log('default');
        break;
    }
    // console.log(JSON.stringify(this.state));
    // console.log(currentOperand);
  }

  render() {
    return (
      <>
        <Display
          start={this.state.start}
          operating={this.state.operating}
          operation={this.state.operation}
          output={this.state.output}
          toRepeat={this.state.toRepeat}
        />
        <Buttons click={this.buttonClick} />
      </>
    );
  }
}

export default Calculator;
