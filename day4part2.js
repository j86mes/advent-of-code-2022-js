const readFileLineByLine = require('./line-by-line-file-reader');

let totalOverlappingRanges = 0;

// eslint-disable-next-line arrow-body-style
const rangeAOverlapsRangeB = (aMin, aMax, bMin, bMax) => {
  return parseInt(aMin, 10) <= parseInt(bMax, 10) && parseInt(aMax, 10) >= parseInt(bMin, 10);
};

const lineHandlerFunction = (input) => {
  const groups = input.split(',');
  const [minA, maxA] = groups[0].split('-');
  const [minB, maxB] = groups[1].split('-');
  // eslint-disable-next-line max-len
  if (rangeAOverlapsRangeB(minA, maxA, minB, maxB)) {
    totalOverlappingRanges += 1;
  }
};

readFileLineByLine('./input/day4.txt', lineHandlerFunction).then(() => {
  console.log(totalOverlappingRanges);
});
