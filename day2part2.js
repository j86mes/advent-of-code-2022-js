const readFileLineByLine = require('./line-by-line-file-reader');

let totalScorePartTwo = 0;

const lineHandlerFunctionPartTwo = (input) => {
  let a = 0;
  if (input[0] === 'A') {
    a = 1;
  } else if (input[0] === 'B') {
    a = 2;
  } else {
    a = 3;
  }

  const b = input[2];
  let pieceScore = 0;
  if (b === 'X') {
    totalScorePartTwo += 0;
    // 1 then 3, 2 then 1, 3 then 2
    if (a === 1) {
      pieceScore = 3;
    } else if (a === 2) {
      pieceScore = 1;
    } else {
      pieceScore = 2;
    }
  } else if (b === 'Y') {
    totalScorePartTwo += 3;
    pieceScore = a;
  } else {
    totalScorePartTwo += 6;
    // 1 then 2, 2 then 3, 3 then 1
    if (a === 1) {
      pieceScore = 2;
    } else if (a === 2) {
      pieceScore = 3;
    } else {
      pieceScore = 1;
    }
  }
  totalScorePartTwo += pieceScore;
};

readFileLineByLine('./input/day2.txt', lineHandlerFunctionPartTwo).then(() => {
  console.log(totalScorePartTwo);
});
