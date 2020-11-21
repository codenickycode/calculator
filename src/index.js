import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './Buttons.js';
import Display from './Display.js';
import './index.css';

console.clear();

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decDisabled: false,
      decPlace: 1,
      prevInput: '',
      currentOperand: 0,
      operation: [],
      evaluation: 0,
      output: '',
    };
    this.buttonClick = this.buttonClick.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  evaluate() {
    console.log(this.state.operation);
  }

  buttonClick(input) {
    let {
      decDisabled,
      decPlace,
      prevInput,
      currentOperand,
      operation,
    } = this.state;
    switch (input) {
      case 'clear':
        this.setState({
          decDisabled: false,
          decPlace: 1,
          prevInput: '',
          currentOperand: 0,
          operation: [],
          evaluation: 0,
          output: '',
        });
        this.setState({ operation: [] });
        break;
      case 'Enter':
        operation.push(currentOperand);
        this.setState({ operation: operation });
        this.evaluate();
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
        if (decPlace >= 10000) {
          break;
        }
        let inputInt = parseInt(input);
        if (decDisabled) {
          decPlace *= 10;
          inputInt /= decPlace;
        } else {
          currentOperand *= 10;
        }
        currentOperand += inputInt;
        if (decDisabled) {
          currentOperand = Math.trunc(currentOperand * decPlace) / decPlace;
        }
        this.setState({
          decPlace: decPlace,
          prevInput: input,
          currentOperand: currentOperand,
          output: currentOperand,
        });
        break;
      case '.':
        if (!decDisabled) {
          this.setState({
            decDisabled: true,
            prevInput: input,
            currentOperand: currentOperand,
            output: currentOperand + '.',
          });
          break;
        } else {
          break;
        }
      case '-':
      case '*':
      case '/':
      case '+':
        if (
          prevInput === '+' ||
          prevInput === '-' ||
          prevInput === '*' ||
          prevInput === '/'
        ) {
          operation.pop();
          operation.push(input);
        } else {
          operation.push(currentOperand, input);
        }
        this.setState({
          decDisabled: false,
          prevInput: input,
          currentOperand: 0,
          operation: operation,
          output: input,
        });
        break;
      default:
        console.log('default');
        break;
    }
  }

  render() {
    return (
      <>
        <Display operation={this.state.operation} output={this.state.output} />
        <Buttons click={this.buttonClick} />
      </>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById('calculator'));

// evaluate() {
//     let toString = this.state.operation.toString();
//     toString = toString.replace(/,/g, '');
//     let result = eval(toString);
//     this.setState({
//       decDisabled: false,
//       decPlace: 1,
//       prevInput: '',
//       currentOperand: null,
//       operation: [result],
//       evaluation: result,
//       output: result,
//     });
//   }
