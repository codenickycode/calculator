function toExpression(string) {
  if (typeof string !== 'string') {
    string = JSON.stringify(string);
  }
  string = string
    .replace(/[^0-9eE\.\+\-\*\/]/g, '') // remove anything that isn't arithmetic
    .replace(/\.{2,}/g, '.') // replace multiple decimals with single decimal
    .replace(/^\D*(?=\-\.\d)|^\D*(?=\.\d)|^\D*(?=\-\d)|^\D*(?=\d)|\D+$/, '') // remove invalid leading/trailing characters
    .replace(/[\+\-\*\/]*(\+\-|\-\-|\*\-|\/\-)/g, '$1') // replace 2+ operators but preserve negative signs
    .replace(/[\+\-\*\/]+([\+\*\/])/g, '$1') // replace remaining 2+ operators
    .replace(/((\d\.\d+)(?:\.+\d+)+|\.+(\D))/g, '$2'); // truncate everything after additional decimal
  return string;
}

function expToArray(string) {
  string = string
    .replace(/([\+\*\/])/g, '~$1~') // delimit operators with ~
    .replace(/(\d)\-\-(\.?\d)/g, '$1~-~-$2') // delimit -- (only the operator -)
    .replace(/([^~])\-/g, '$1~-~') // delimit - (not a negative sign)
    .split('~'); // array format [number, operator, number, operator, ...]
  return string;
}
