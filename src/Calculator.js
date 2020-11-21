import React from 'react';
import Buttons from './Buttons.js';
import Display from './Display.js';
import { evaluate } from './evaluate.js';

console.clear();

const INITIAL_STATE = {
  start: true,
  decDisabled: false,
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
    let { start, decDisabled, decPlace, operating, isNeg, currentOperand, operation, toRepeat } = this.state;

    // if added decimal places, convert back to number
    currentOperand = parseFloat(currentOperand);

    switch (input) {
      case 'clear':
        this.setState(INITIAL_STATE);
        break;
      case 'Enter':
        if (start) {
          if (operation.length === 1) {
            toRepeat.splice(0, 1, operation[0]);
            operation = [...toRepeat];
          } else {
            break;
          }
        } else if (operating) {
          operation.pop();
        } else {
          operation.push(currentOperand);
        }
        if (operation.length === 3) {
          toRepeat = [...operation];
        }
        console.log('operation to be evaluated: ', operation);
        let evaluation = evaluate(operation);
        evaluation = parseFloat(evaluation);
        this.setState(INITIAL_STATE);
        this.setState({
          operation: [evaluation],
          output: evaluation,
          toRepeat: toRepeat,
        });
        break;
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
          this.setState({ start: false, operation: [] });
        }
        if (decPlace >= 4) {
          break;
        }
        let inputInt = parseInt(input);
        if (isNeg) {
          inputInt = inputInt * -1;
        }
        if (decDisabled) {
          decPlace++;
          inputInt /= Math.pow(10, decPlace);
        } else {
          currentOperand *= 10;
        }
        currentOperand += inputInt;
        if (decDisabled) {
          currentOperand = currentOperand.toFixed(decPlace);
        }
        this.setState({
          start: false,
          decPlace: decPlace,
          operating: false,
          currentOperand: currentOperand,
          output: currentOperand,
        });
        break;
      case '.':
        if (start) {
          this.setState({ start: false, operation: [] });
        }
        if (!decDisabled) {
          this.setState({
            decDisabled: true,
            operating: false,
            currentOperand: currentOperand,
            output: currentOperand + '.',
          });
          break;
        } else {
          break;
        }
      case '*':
      case '/':
      case '+':
      case '-':
        if (start && input === '-' && operation.length !== 1) {
          this.setState({ isNeg: true, output: input });
          break;
        }
        if (operating) {
          if (input === '-') {
            this.setState({ isNeg: true, output: input });
            break;
          }
          operation.pop();
          operation.push(input);
        } else {
          if (start && operation.length === 1) {
            operation.push(input);
            start = false;
          } else {
            operation.push(currentOperand, input);
          }
        }
        this.setState({
          start: start,
          decDisabled: false,
          decPlace: 0,
          operating: true,
          isNeg: false,
          currentOperand: 0,
          operation: operation,
          output: input,
          toRepeat: [],
        });
        break;
      default:
        console.log('default');
        break;
    }
    console.log(JSON.stringify(this.state));
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
