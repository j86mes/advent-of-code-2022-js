const readFileLineByLine = require('./line-by-line-file-reader');

let messageStartIndex = 0;

const lineHandlerFunction = (input, uniqueSequenceLength) => {
  if (input) {
    let uniqueSequence = [];
    let index = 0;
    while (uniqueSequence.length < uniqueSequenceLength && index < input.length) {
      const currentChar = input[index];
      const lastOccurence = uniqueSequence.findLastIndex((c) => c === currentChar);
      if (lastOccurence >= 0) {
        uniqueSequence = uniqueSequence.slice(lastOccurence + 1);
      }
      uniqueSequence.push(currentChar);
      index += 1;
    }
    messageStartIndex = index;
  }
};

// part a
readFileLineByLine('./input/day6.txt', lineHandlerFunction, 4).then(() => {
  console.log(messageStartIndex);

  // followed by part b
  readFileLineByLine('./input/day6.txt', lineHandlerFunction, 14).then(() => {
    console.log(messageStartIndex);
  });
});
