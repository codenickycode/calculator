import evaluateArray from './evaluateArray.js';

const INITIAL_STATE = {
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
};
const MAX_INPUT_LENGTH = 14;

const inputReducer = (state = INITIAL_STATE, action) => {
  const input = action.input;
  const props = { ...state };
  let { start, newOperand, decimal, decPlace, operating, isNeg } = props;
  // if we previously converted to string to add decimal places
  let currentOperand = parseFloat(state.currentOperand);
  // make copies of arrays
  let operation = [...state.operation];
  let toRepeat = [...state.toRepeat];

  switch (input) {
    // ********* AC / BACKSPACE / DEL ********* //
    case 'clear':
      // re-initialize state
      return INITIAL_STATE;

    // ********* ENTER / = ********* //
    case 'Enter':
      if (newOperand) {
        // if we have something to repeat
        if (toRepeat.length === 3) {
          // set that to the current operation
          operation = [...toRepeat];
        } else {
          // otherwise, do nothing
          return state;
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
      // console.time('evaluation');
      let evaluation = evaluateArray(...operation);
      // console.timeEnd('evaluation');
      if (isNaN(evaluation)) {
        // re-init and output error message
        return { ...INITIAL_STATE, output: evaluation };
      } else {
        // re-initialize,
        // carry over evaluation and toRepeat operation
        // display the evaluation as output
        let newState = {
          start: false,
          operation: [evaluation],
          operationDisplay: [...operation, '=', evaluation],
          toRepeat: [evaluation, ...toRepeat],
          output: evaluation,
        };
        return { ...INITIAL_STATE, ...newState };
      }

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
        return state;
      }
      if (newOperand) {
        // clear carried over operation
        start = false;
        newOperand = false;
        operation = [];
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
        currentOperand = currentOperand.toFixed(decPlace);
      }
      // continue creating the currentOperand
      return {
        ...state,
        start: false,
        newOperand: false,
        decPlace,
        operating: false,
        currentOperand,
        operation: operation,
        operationDisplay: [...operation, currentOperand],
        output: currentOperand,
      };

    // ********* DECIMAL ********* //
    case '.':
      if (currentOperand.toString().length > MAX_INPUT_LENGTH) {
        return state;
      }
      if (newOperand) {
        // clear carried over operation
        start = false;
        newOperand = false;
        operation = [];
      }
      if (!decimal) {
        // operand will now add decimal places
        return {
          ...state,
          start,
          newOperand,
          decimal: true,
          operating: false,
          currentOperand,
          operation: operation,
          output: currentOperand + '.',
        };
      } else {
        // otherwise, do nothing
        return state;
      }

    // ********* OPERATORS ********* //
    case '*':
    case '/':
    case '+':
    case '-':
      // DOUBLE CHECK THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if (newOperand && input === '-' && operation.length !== 1) {
        // it's a sign change (-)
        return { ...state, start: false, isNeg: true, output: input };
      }
      // if there's already an operator
      if (operating) {
        if (input === '-') {
          // minus is now a sign change
          return { ...state, isNeg: true, output: input };
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
      return {
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
      };

    // only on initialization
    default:
      return state;
  }
};

export default inputReducer;
