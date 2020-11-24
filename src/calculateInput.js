import { evaluateArray } from './evaluateArray.js';

function calculateInput(input, INITIAL_STATE, state) {
  const init = INITIAL_STATE();
  const MAX_INPUT_LENGTH = 14;
  // get all the current values from state
  let props = { ...state };
  let {
    start,
    newOperand,
    decimal,
    decPlace,
    operating,
    operation,
    isNeg,
    currentOperand,
    toRepeat,
  } = props;

  // if we previously converted to a string to
  // add decimal place zeros for display,
  // convert it back to a number
  currentOperand = parseFloat(currentOperand);

  switch (input) {
    // ********* AC / BACKSPACE / DEL ********* //
    case 'clear':
      // re-initialize state
      return init;

    // ********* ENTER / = ********* //
    case 'Enter':
      let evaluation = evaluateArray('+', 0, 9, 1, 3);
      return {
        output: evaluation,
      };
      break;
    //   if (newOperand) {
    //     // if we have something to repeat
    //     if (toRepeat.length === 3) {
    //       // set that to the current operation
    //       operation = [...toRepeat];
    //     } else {
    //       // otherwise, do nothing
    //       break;
    //     }
    //   } else if (operating) {
    //     // drop extra operator at end of operation
    //     operation.pop();
    //   } else {
    //     // push currentOperand to operation
    //     operation.push(currentOperand);
    //   }
    //   // save last part for repeat
    //   toRepeat = operation.slice(-2);
    //   // let the evaluation begin!
    //   // console.time('evaluation');
    //   let evaluation = evaluateArray(...operation);
    //   // console.timeEnd('evaluation');
    //   if (isNaN(evaluation)) {
    //     // output error message
    //     let newState = { output: evaluation };
    //     return { ...init, ...newState };
    //   } else {
    //     // re-initialize,
    //     // carry over evaluation and toRepeat operation
    //     // display the evaluation as output
    //     let newState = {
    //       start: false,
    //       operation: [evaluation],
    //       operationDisplay: [...operation, '=', evaluation],
    //       output: evaluation,
    //       toRepeat: [evaluation, ...toRepeat],
    //     };
    //     return { ...init, ...newState };
    //   }

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
        // add 0s
        currentOperand = currentOperand.toFixed(decPlace);
      }
      // continue creating the currentOperand
      return {
        start: false,
        newOperand: false,
        decPlace: decPlace,
        operating: false,
        currentOperand: currentOperand,
        operation: operation,
        operationDisplay: [...operation, currentOperand],
        output: currentOperand,
      };

    // ********* DECIMAL ********* //
    case '.':
      if (currentOperand.toString().length > MAX_INPUT_LENGTH) {
        break;
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
          start: start,
          newOperand: newOperand,
          decimal: true,
          operating: false,
          currentOperand: currentOperand,
          operation: operation,
          output: currentOperand + '.',
        };
      } else {
        // otherwise, do nothing
        break;
      }

    // ********* OPERATORS ********* //
    case '*':
    case '/':
    case '+':
    case '-':
      // DOUBLE CHECK THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if (newOperand && input === '-' && operation.length !== 1) {
        // it's a sign change (-)
        return { start: false, isNeg: true, output: input };
      }
      // if there's already an operator
      if (operating) {
        if (input === '-') {
          // minus is now a sign change
          return { isNeg: true, output: input };
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

    // this should never happen
    default:
      console.log('default');
  }
}

export default calculateInput;
