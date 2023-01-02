const readFileLineByLine = require('./line-by-line-file-reader');

let totalScore = 0;

const lineHandlerFunction = (input) => {
  let a = 0;
  if (input[0] === 'A') {
    a = 1;
  } else if (input[0] === 'B') {
    a = 2;
  } else {
    a = 3;
  }

  let b = 0;
  if (input[2] === 'X') {
    b = 1;
  } else if (input[2] === 'Y') {
    b = 2;
  } else {
    b = 3;
  }

  if (a === b) {
    totalScore += 3;
  } else if (a + 1 === b) {
    totalScore += 6;
  } else if (a === 3 && b === 1) {
    totalScore += 6;
  }

  totalScore += b;
};

readFileLineByLine('./input/day2.txt', lineHandlerFunction).then(() => {
  console.log(totalScore);
});
