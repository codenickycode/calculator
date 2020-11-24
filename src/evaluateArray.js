import Decimal from 'decimal.js-light';

export function evaluateArray(...array) {
  const formatError = `
      evaluateArray.js Error: ${JSON.stringify(array)}
      Array format must be: [number, operator, number, operator, ... , number]
      Operators must be one of the following strings: '+' , '-' , '*' , '/' 
      `;
  if (array.length % 2 === 0) {
    console.log(formatError);
    return 'Error';
  }

  // each operator's function and first index
  const op = {
    '/': {
      index: array.indexOf('/'),
      operation: (first, second) =>
        second.isZero() ? 'dbz' : first.dividedBy(second),
    },
    '*': {
      index: array.indexOf('*'),
      operation: (first, second) => first.times(second),
    },
    '-': {
      index: array.indexOf('-'),
      operation: (first, second) => first.minus(second),
    },
    '+': {
      index: array.indexOf('+'),
      operation: (first, second) => first.plus(second),
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
      console.log(formatError);
      return 'Error';
    }
    const first = Decimal(array[index]);
    const second = Decimal(array[index + 2]);
    let newNum = op[operator].operation(first, second);
    if (newNum === 'dbz') return 'DIVIDE BY ZERO';
    newNum = newNum.toNumber();
    if (newNum >= Number.MAX_VALUE || newNum === Infinity) return 'MAX VALUE';
    // insert operand where we removed operation
    array.splice(index, 3, newNum);
    op[operator].index = array.indexOf(operator);
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

  if (array.length > 1) {
    console.log(formatError);
    return 'Error';
  }
  return array[0];
}
