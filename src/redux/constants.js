export const INITIAL_STATE = {
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

export const MAX_INPUT_LENGTH = 14;
