// got confused during postfix stack evaluation
// should start that section over

import Decimal from 'decimal.js-light';

export function syEvaluateArray(...array) {
  if (array.length % 2 === 0) throw new Error('Invalid Format 1');

  const OPERATIONS = {
    '/': {
      operation: (first, second) => Decimal(first).dividedBy(Decimal(second)),
      precedence: 2,
    },
    '*': {
      operation: (first, second) => Decimal(first).times(Decimal(second)),
      precedence: 2,
    },
    '-': {
      operation: (first, second) => Decimal(first).minus(Decimal(second)),
      precedence: 1,
    },
    '+': {
      operation: (first, second) => Decimal(first).plus(Decimal(second)),
      precedence: 1,
    },
  };

  // expression to Postfix Notation
  let queue = []; // expression queue, starts with first operand
  let operators = []; // stack to determine precendence of operation
  function test(operator) {
    if (operators.length === 0) {
      operators.push(operator);
    } else if (
      OPERATIONS[operator].precedence >
      OPERATIONS[operators[operators.length - 1]].precedence
    ) {
      operators.unshift(operator);
    } else if (
      OPERATIONS[operator].precedence ===
      OPERATIONS[operators[operators.length - 1]].precedence
    ) {
      let spliced = operators.splice(0, operators.length);
      queue = [...queue, ...spliced];
      operators.push(operator);
    } else {
      queue.push(operators.pop());
      test(operator);
    }
  }

  for (let i = 0; i < array.length; i++) {
    // even indexes are operands
    if (i % 2 === 0) {
      queue.push(array[i]);
    } else {
      // test precedence of operator
      test(array[i]);
    }
  }
  // push all remaining operators
  queue = [...queue, ...operators];

  // Postfix stack evaluation
  let stack = [];
  let stack2 = [];
  let first = 0;
  let second = 0;
  for (let i = 0; i < queue.length; i++) {
    if (!isNaN(queue[i])) {
      stack.push(queue[i]);
    } else {
      if (stack.length === 0) {
        first = stack2.shift();
        if (stack2.length === 0) {
          second = stack.shift();
        } else {
          second = stack2.shift();
        }
      } else {
        first = stack.shift();
        if (stack.length === 0) {
          second = stack2.shift();
        } else {
          second = stack.shift();
        }
      }
      if (
        first === Infinity ||
        first >= Number.MAX_VALUE ||
        second === Infinity ||
        second >= Number.MAX_VALUE
      ) {
        return 'MAX VALUE';
      } else if (first === -Infinity || second === -Infinity) {
        return 'MIN VALUE';
      } else if (queue[i] === '/' && second === 0) {
        return 'DIVIDE BY ZERO';
      }

      let result = OPERATIONS[queue[i]].operation(first, second);
      if (stack.length === 0) {
        stack2.push(result.toNumber());
      } else {
        stack.unshift(result.toNumber());
      }
    }
  }

  if (stack.length > 1) throw new Error('Invalid Format 3');

  return stack[0];
}

export default syEvaluateArray;
