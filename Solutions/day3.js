const readFileLineByLine = require('./line-by-line-file-reader');

const items = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const letterValue = (letter) => items.findIndex((item) => item === letter) + 1;

let totalScore = 0;

const lineHandlerFunction = (input) => {
  const packSize = input.length / 2;
  const firstPack = [...input].slice(0, packSize);
  const secondPack = [...input].slice(packSize, packSize * 2);
  // eslint-disable-next-line no-restricted-syntax
  for (const l of firstPack) {
    if (secondPack.some((letter) => letter === l)) {
      totalScore += letterValue(l);
      break;
    }
  }
};

readFileLineByLine('./input/day3.txt', lineHandlerFunction).then(() => {
  console.log(totalScore);
});
