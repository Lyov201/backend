const myMath = require('./utils/math');
const myString = require('./utils/string');

console.log(myMath.add(4, 3));
console.log(myMath.subtract(4, 3));
console.log(myMath.multiply(4, 3));
console.log(myString.capitalize("hello World"));

console.log(require.cache);
// These files are in require.cache because Node.js loaded them using require().