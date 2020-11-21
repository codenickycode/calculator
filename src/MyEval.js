function divide(array) {
  let first = array[0];
  let second = array[2];
  return first / second;
}

function multiply(array) {
  let first = array[0];
  let second = array[2];
  return first * second;
}

function subtract(array) {
  let first = array[0];
  let second = array[2];
  return first - second;
}

function add(array) {
  let first = array[0];
  let second = array[2];
  return first + second;
}

function evaluate(array) {
  // base case
  if (array.length === 1) {
    return array[0];
  }
  // temporary variables
  let tempArr = [];
  let newOp = null;
  // first index of each operator
  let indexDivide = array.indexOf('/') - 1;
  let indexMultiply = array.indexOf('*') - 1;
  let indexSubtract = array.indexOf('-') - 1;
  let indexAdd = array.indexOf('-') - 1;
  // if there's division
  if (indexDivide !== -2) {
    // remove the operation
    tempArr = array.splice(indexDivide, 3);
    // divide
    newOp = divide(tempArr);
    // insert operand where we removed operation
    array.splice(indexDivide, 0, newOp);
    // recurse
    evaluate(array);
  }
  // multiplication (same as division)
  if (indexMultiply !== -2) {
    tempArr = array.splice(indexMultiply, 3);
    newOp = multiply(tempArr);
    array.splice(indexMultiply, 0, newOp);
    evaluate(array);
  }
  // perform add and subtract, comparing
  // index to preserve order of operations
  if (indexSubtract < indexAdd) {
    tempArr = array.splice(indexSubtract, 3);
    newOp = subtract(tempArr);
    array.splice(indexSubtract, 0, newOp);
    evaluate(array);
  } else {
    tempArr = array.splice(indexAdd, 3);
    newOp = add(tempArr);
    array.splice(indexAdd, 0, newOp);
    evaluate(array);
  }
}

/* first must convert numbers to negative in array */
let array = [1, '+', 3, '/', 3, '-', 2, '*', 2]; // => -2
console.log(evaluate(array));
