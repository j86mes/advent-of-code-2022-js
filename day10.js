const readFileLineByLine = require('./line-by-line-file-reader');

const cycles = [];

const lineHandlerFunction = (input) => {
  const currentCycle = { x: 1, vectorX: 0 };
  if (cycles.length > 1) {
    const lastCycle = cycles[cycles.length - 1];
    currentCycle.x = lastCycle.x + lastCycle.vectorX;
  }
  if (input === 'noop') {
    cycles.push(currentCycle);
    return;
  }
  currentCycle.vectorX = parseInt(input.split(' ')[1], 10);
  cycles.push(currentCycle);
  cycles.push(currentCycle);
  // as the addx takes two cycles, I'm just sticking this in twice but the first
  // won't be actioned. it's value is correct though
};

// eslint-disable-next-line arrow-body-style
const getStrengthAt = (index, cycleSet) => {
  const cycle = cycleSet[index - 1];
  return index * cycle.x;
};

const crtCharAt = (index, cycleSet) => {
  if (Math.abs(cycleSet[index].x - ((index) % 40)) <= 1) {
    return '#';
  }
  return '.';
};

readFileLineByLine('./input/day10.txt', lineHandlerFunction).then(() => {
  let sum = getStrengthAt(20, cycles);
  sum += getStrengthAt(60, cycles);
  sum += getStrengthAt(100, cycles);
  sum += getStrengthAt(140, cycles);
  sum += getStrengthAt(180, cycles);
  sum += getStrengthAt(220, cycles);
  console.log(sum);

  let row = [];
  for (let i = 0; i < 240; i += 1) {
    if (i % 40 === 0) {
      console.log(row.join(''));
      row = [];
    }
    row.push(crtCharAt(i, cycles));
  }
  console.log(row.join(''));
});
