export const INITIAL_STATE = {
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
};

export const MAX_INPUT_LENGTH = 9;
