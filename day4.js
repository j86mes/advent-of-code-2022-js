const readFileLineByLine = require('./line-by-line-file-reader');

let totalContainedRanges = 0;

// eslint-disable-next-line arrow-body-style
const rangeAContainsRangeB = (aMin, aMax, bMin, bMax) => {
  return parseInt(aMin, 10) <= parseInt(bMin, 10) && parseInt(aMax, 10) >= parseInt(bMax, 10);
};

const lineHandlerFunction = (input) => {
  const groups = input.split(',');
  const [minA, maxA] = groups[0].split('-');
  const [minB, maxB] = groups[1].split('-');
  // eslint-disable-next-line max-len
  if (rangeAContainsRangeB(minA, maxA, minB, maxB) || rangeAContainsRangeB(minB, maxB, minA, maxA)) {
    totalContainedRanges += 1;
  }
};

readFileLineByLine('./input/day4.txt', lineHandlerFunction).then(() => {
  console.log(totalContainedRanges);
});
