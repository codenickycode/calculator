import Decimal from 'decimal.js-light';

function evaluateArray(...array) {
  if (array.length % 2 === 0) throw new Error('Invalid Format 1');

  // each operator's function and first index
  const op = {
    '/': {
      index: array.indexOf('/'),
      operation: (first, second) => Decimal(first).dividedBy(Decimal(second)),
    },
    '*': {
      index: array.indexOf('*'),
      operation: (first, second) => Decimal(first).times(Decimal(second)),
    },
    '-': {
      index: array.indexOf('-'),
      operation: (first, second) => Decimal(first).minus(Decimal(second)),
    },
    '+': {
      index: array.indexOf('+'),
      operation: (first, second) => Decimal(first).plus(Decimal(second)),
    },
  };

  // Removes operation from array, replaces it with evaluation,
  // returns new index of current operator or error.
  // Operation uses decimal.js for better precision,
  // but converts back to a Number before returning.
  function evaluate(operator) {
    const index = array.indexOf(operator) - 1;
    if (
      index === -1 ||
      array[index + 2] === undefined ||
      isNaN(array[index]) ||
      isNaN(array[index + 2])
    ) {
      throw new Error('Invalid Format 2');
    }
    const first = array[index];
    const second = array[index + 2];
    if (
      first === Infinity ||
      first >= Number.MAX_VALUE ||
      second === Infinity ||
      second >= Number.MAX_VALUE
    ) {
      return 'MAX VALUE';
    } else if (first === -Infinity || second === -Infinity) {
      return 'MIN VALUE';
    } else if (operator === '/' && second === 0) {
      return 'DIVIDE BY ZERO';
    }
    let newNum = op[operator].operation(first, second);
    newNum = newNum.toNumber();
    // insert operand where we removed operation
    array.splice(index, 3, newNum);
    op['/'].index = array.indexOf('/');
    op['*'].index = array.indexOf('*');
    op['-'].index = array.indexOf('-');
    op['+'].index = array.indexOf('+');
  }

  // preserving order of operations,
  // first handle division and multiplication
  while (op['/'].index !== -1 || op['*'].index !== -1) {
    // preserve left to right
    if (
      (op['/'].index < op['*'].index && op['/'].index !== -1) ||
      op['*'].index === -1
    ) {
      let error = evaluate('/');
      if (error) return error;
    } else {
      let error = evaluate('*');
      if (error) return error;
    }
  }
  // now handle addition and subtraction
  while (op['+'].index !== -1 || op['-'].index !== -1) {
    // preserve left to right
    if (
      (op['+'].index < op['-'].index && op['+'].index !== -1) ||
      op['-'].index === -1
    ) {
      let error = evaluate('+');
      if (error) return error;
    } else {
      let error = evaluate('-');
      if (error) return error;
    }
  }

  if (array.length > 1) throw new Error('Invalid Format 3');

  return array[0];
}

export default evaluateArray;
