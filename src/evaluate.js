// import Decimal from 'decimal.js-light';
// import Decimal from 'decimal.js';

// temporary variables
let tempArr = [];
let first = null;
let second = null;
let newOp = null;
let dbzError = false;

function divide(array, indexDivide, indexMultiply) {
  // preserve left to right order of operations
  if (
    (indexDivide < indexMultiply || indexMultiply === -2) &&
    indexDivide !== -2
  ) {
    // remove the operation
    tempArr = array.splice(indexDivide, 3);
    first = tempArr[0];
    second = tempArr[2];
    if (second === 0) {
      // can't equate object value
      dbzError = true;
      return;
    }
    // divide
    newOp = first / second;
    // insert operand where we removed operation
    array.splice(indexDivide, 0, newOp);
  } else {
    multiply(array, indexMultiply, indexDivide);
  }
}

function multiply(array, indexMultiply, indexDivide) {
  // preserve left to right order of operations
  if (
    (indexMultiply < indexDivide || indexDivide === -2) &&
    indexMultiply !== -2
  ) {
    // remove the operation
    tempArr = array.splice(indexMultiply, 3);
    first = tempArr[0];
    second = tempArr[2];
    // multiply
    newOp = first * second;
    // insert operand where we removed operation
    array.splice(indexMultiply, 0, newOp);
  } else {
    divide(array, indexDivide, indexMultiply);
  }
}

function subtract(array, indexSubtract, indexAdd) {
  // preserve left to right order of operations
  if ((indexSubtract < indexAdd || indexAdd === -2) && indexSubtract !== -2) {
    // remove the operation
    tempArr = array.splice(indexSubtract, 3);
    first = tempArr[0];
    second = tempArr[2];
    // subtract
    newOp = first - second;
    // insert operand where we removed operation
    array.splice(indexSubtract, 0, newOp);
  } else {
    add(array, indexAdd, indexSubtract);
  }
}

function add(array, indexAdd, indexSubtract) {
  // preserve left to right order of operations
  if ((indexAdd < indexSubtract || indexSubtract === -2) && indexAdd !== -2) {
    // remove the operation
    tempArr = array.splice(indexAdd, 3);
    first = tempArr[0];
    second = tempArr[2];
    // add
    newOp = first + second;
    // insert operand where we removed operation
    array.splice(indexAdd, 0, newOp);
  } else {
    subtract(array, indexSubtract, indexAdd);
  }
}

export function evaluate(...array) {
  // if (Infinity in array) {
  //   return Infinity;
  // } else if (-Infinity in array) {
  //   return -Infinity;
  // }
  // base case
  while (array.length > 1) {
    // first index of each operator
    let indexDivide = array.indexOf('/') - 1;
    let indexMultiply = array.indexOf('*') - 1;
    let indexSubtract = array.indexOf('-') - 1;
    let indexAdd = array.indexOf('+') - 1;

    // first handle divide and multiply
    while (indexDivide !== -2 || indexMultiply !== -2) {
      // if there's division
      if (indexDivide !== -2) {
        // update indexes
        indexDivide = array.indexOf('/') - 1;
        indexMultiply = array.indexOf('*') - 1;
        divide(array, indexDivide, indexMultiply);
        if (dbzError) return 'dbz';
      }
      // if there's multiplication
      if (indexMultiply !== -2) {
        // update indexes
        indexDivide = array.indexOf('/') - 1;
        indexMultiply = array.indexOf('*') - 1;
        multiply(array, indexMultiply, indexDivide);
      }
      // update indexes
      indexDivide = array.indexOf('/') - 1;
      indexMultiply = array.indexOf('*') - 1;
    }
    // if there's subtraction
    if (indexSubtract !== -2) {
      // update indexes
      indexSubtract = array.indexOf('-') - 1;
      indexAdd = array.indexOf('+') - 1;
      subtract(array, indexSubtract, indexAdd);
    }
    // if there's addition
    if (indexAdd !== -2) {
      // update indexes
      indexSubtract = array.indexOf('-') - 1;
      indexAdd = array.indexOf('+') - 1;
      add(array, indexAdd, indexSubtract);
    }
  }

  let result = array[0] > Number.MAX_VALUE ? 'max' : array[0];

  return result;
}
