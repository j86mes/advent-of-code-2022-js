const clone = require('just-clone');
const readFileLineByLine = require('./line-by-line-file-reader');

/**
 * to avoid multiple iterations:
 * read line by line, pushing values onto stacks, this will give you inverted stacks
 * pop the stacks onto new stacks to invert the order, putting them in the original state.
 *
 * then, carry out the procedures.
 *
 * ^^ an even simpler solution is just to unshift the values into place, and skip
 * the reverting of the stacks altogether.
 */
let instructionsReached = false;
let stacks = [];

const pushValueOntoStackCollection = (value, index, stackSet) => {
  while (stackSet.length <= index) {
    stackSet.push([]);
  }
  stackSet[index].push(value);
};

// eslint-disable-next-line arrow-body-style
const isEndOfStackState = (input) => {
  return input === '';
};

const invertStackSet = (stackSet) => {
  const newStacks = [];
  for (let i = 0; i < stackSet.length; i += 1) {
    while (stackSet[i].length > 0) {
      pushValueOntoStackCollection(stackSet[i].pop(), i, newStacks);
    }
  }
  return newStacks;
};

const populateInitialStacks = (input, stackSet) => {
  let newStacks = clone(stackSet);
  instructionsReached = isEndOfStackState(input);
  if (!instructionsReached) {
    let stackIndex = 0;
    while (input.length > stackIndex * 4) {
      const stackCharIndex = stackIndex * 4;
      const stackValue = input.substring(stackCharIndex, stackCharIndex + 3);
      if (stackValue !== '   ') {
        if (stackValue.indexOf('[') >= 0) {
          pushValueOntoStackCollection(stackValue.substring(1, 2), stackIndex, newStacks);
        }
      }
      stackIndex += 1;
    }
  } else {
    // if I used unshift instead of push, this whole inversion could be removed.
    newStacks = invertStackSet(newStacks);
  }
  return newStacks;
};

const parseInstruction = (instruction) => {
  const parts = instruction.split(' ');
  return { move: parts[1], from: parts[3] - 1, to: parts[5] - 1 };
};

const updateStackSet = (stackSet, move, from, to) => {
  const newStacks = clone(stackSet);
  newStacks[to].push(...newStacks[from].splice(-move, move));
  return newStacks;
};

const carryOutInstruction = (instruction, stackSet) => {
  const { move, from, to } = parseInstruction(instruction);
  return updateStackSet(stackSet, move, from, to);
};

const lineHandlerFunction = (input) => {
  if (instructionsReached) {
    stacks = carryOutInstruction(input, stacks);
  } else {
    stacks = populateInitialStacks(input, stacks);
  }
};

readFileLineByLine('./input/day5.txt', lineHandlerFunction).then(() => {
  let topRow = '';
  for (let i = 0; i < stacks.length; i += 1) {
    topRow += stacks[i].at(-1);
  }
  console.log(topRow);
});
