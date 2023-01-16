const clone = require('just-clone');
const readFileLineByLine = require('./line-by-line-file-reader');

const xVectorFromInstruction = (instruction) => {
  const parts = instruction.split(' ');
  const distance = parseInt(parts[1], 10);
  if (parts[0] === 'R') {
    return distance;
  }
  if (parts[0] === 'L') {
    return -distance;
  }
  return 0;
};

const yVectorFromInstruction = (instruction) => {
  const parts = instruction.split(' ');
  const distance = parseInt(parts[1], 10);
  if (parts[0] === 'U') {
    return distance;
  }
  if (parts[0] === 'D') {
    return -distance;
  }
  return 0;
};

// eslint-disable-next-line arrow-body-style
const sizeOfCurrentVector = (xVector, yVector) => {
  return Math.abs(xVector) + Math.abs(yVector);
};

const parseInstructions = (instruction) => {
  const vectors = {
    xVector: xVectorFromInstruction(instruction),
    yVector: yVectorFromInstruction(instruction),
  };
  return vectors;
};

const moveHead = (head, xVector, yVector) => {
  const newHead = clone(head);
  newHead.xVector = xVector;
  newHead.yVector = yVector;
  newHead.x += newHead.xVector;
  newHead.y += newHead.yVector;
  return newHead;
};

const moveTail = (tail, head) => {
  const newTail = clone(tail);

  if (head.xVector === 0) {
    newTail.x = head.x;
    newTail.y = head.y - (head.yVector < 0 ? -1 : 1);
  } else if (head.yVector === 0) {
    newTail.y = head.y;
    newTail.x = head.x - (head.xVector < 0 ? -1 : 1);
  } else {
    // part b adds the scenario where a tail piece moves in 2 vectors at once
    // and it gives a specific instruction of how they think subsequent pieces
    // should follow.
    if (Math.abs(head.x - tail.x) > 0) {
      newTail.x += head.xVector;
    }
    if (Math.abs(head.y - tail.y) > 0) {
      newTail.y += head.yVector;
    }
  }
  newTail.xVector = newTail.x - tail.x;
  newTail.yVector = newTail.y - tail.y;
  return newTail;
};

const tallyTailLocation = (tail, tallies) => {
  const newTallies = clone(tallies);
  let match = tallies.find((l) => l.x === tail.x && l.y === tail.y);
  if (match === undefined) {
    match = { x: tail.x, y: tail.y, count: 0 };
    newTallies.push(match);
  }
  match.count += 1;
  return newTallies;
};

const doesTailNeedToMove = (tailPosition, headPosition) => {
  if (Math.abs(headPosition.x - tailPosition.x) > 1
  || Math.abs(headPosition.y - tailPosition.y) > 1) {
    return true;
  }
  return false;
};

// eslint-disable-next-line arrow-body-style
const resetLocationTallies = () => {
  return [{ x: 0, y: 0, count: 1 }];
};

// eslint-disable-next-line arrow-body-style
const getNewRopePiece = () => {
  return {
    x: 0, y: 0, xVector: 0, yVector: 0,
  };
};

const populateStarterRope = (numberOfPieces) => {
  const newRope = [];
  for (let i = 0; i < numberOfPieces; i += 1) {
    newRope.push(getNewRopePiece());
  }
  return newRope;
};

let tailLocationTallies = resetLocationTallies();
let ropePieces;

const lineHandlerFunction = (input) => {
  if (input === '') {
    return;
  }

  const { xVector, yVector } = parseInstructions(input);

  // eslint-disable-next-line no-nested-ternary
  const headVectorX = xVector > 0 ? 1 : xVector < 0 ? -1 : 0;
  // eslint-disable-next-line no-nested-ternary
  const headVectorY = yVector > 0 ? 1 : yVector < 0 ? -1 : 0;

  for (let i = 0; i < sizeOfCurrentVector(xVector, yVector); i += 1) {
    let head = ropePieces[0];
    head = moveHead(head, headVectorX, headVectorY);
    ropePieces[0] = head;

    for (let rp = 0; rp < ropePieces.length - 1; rp += 1) {
      head = ropePieces[rp];
      let tail = ropePieces[rp + 1];
      if (doesTailNeedToMove(tail, head)) {
        tail = moveTail(tail, head);
        ropePieces[rp + 1] = tail;
        if (rp + 1 === ropePieces.length - 1) {
          // eslint-disable-next-line max-len
          tailLocationTallies = tallyTailLocation(ropePieces[ropePieces.length - 1], tailLocationTallies);
        }
      } else {
        break;
      }
    }
  }
};

ropePieces = populateStarterRope(2);
readFileLineByLine('./input/day9.txt', lineHandlerFunction).then(() => {
  console.log(tailLocationTallies.map((t) => t.count > 1).length);

  ropePieces = populateStarterRope(10);
  tailLocationTallies = resetLocationTallies();
  readFileLineByLine('./input/day9.txt', lineHandlerFunction).then(() => {
    console.log(tailLocationTallies.map((t) => t.count > 1).length);
  });
});
