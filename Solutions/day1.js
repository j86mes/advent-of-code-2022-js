const readFileLineByLine = require('./line-by-line-file-reader');

let totals = [0];

const lineHandlerFunction = (input) => {
  if (input === '') {
    totals.push(0);
  } else {
    totals[totals.length - 1] += parseInt(input, 10);
  }
};

readFileLineByLine('./input/day1.txt', lineHandlerFunction).then(() => {
  // part a
  console.log(Math.max(...totals));

  // part b
  // need to specify the sort function, as sort goes alphabetical only by default
  totals = totals.sort((a, b) => a - b);

  // sum of the last three
  console.log(totals.slice(-3).reduce((partialSum, a) => partialSum + a, 0));
});
