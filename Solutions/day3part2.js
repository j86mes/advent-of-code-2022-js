const readFileLineByLine = require('./line-by-line-file-reader');

const items = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const letterValue = (letter) => items.findIndex((item) => item === letter) + 1;

let itemIndex = 0;
const groupSize = 3;
const groupItems = [];

// eslint-disable-next-line arrow-body-style
const removeDuplicates = (currentValue, index, arr) => {
  return arr.indexOf(currentValue) === index;
};

// eslint-disable-next-line arrow-body-style
const filterForOverlap = (array1, array2) => {
  return array1.filter((currentValue) => array2.indexOf(currentValue) >= 0);
};

const lineHandlerFunction = (input) => {
  const groupIndex = Math.floor((itemIndex) / groupSize);
  if (groupItems.length > groupIndex) {
    groupItems[groupIndex] = filterForOverlap(groupItems[groupIndex], input);
  } else {
    groupItems.push([...input].filter(removeDuplicates));
  }
  itemIndex += 1;
};

readFileLineByLine('./input/day3.txt', lineHandlerFunction).then(() => {
  // once we've filtered each group to 1 letter, we sum up the value of those letters
  console.log(groupItems.reduce((partialSum, a) => partialSum + letterValue(a[0]), 0));
});
