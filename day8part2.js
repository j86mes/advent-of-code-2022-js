const readFileLineByLine = require('./line-by-line-file-reader');

const treeGrid = [];

const lineHandlerFunction = (input) => {
  treeGrid.push([...input]);
};

const calculateClearenceEachDirection = (trees, treeIndex) => {
  const treeClearences = [0, 0];
  const treeHeight = trees[treeIndex];
  const treesBefore = trees.slice(0, treeIndex);
  const treesAfter = trees.slice(treeIndex + 1, trees.length);
  for (let i = treesBefore.length - 1; i >= 0; i -= 1) {
    treeClearences[0] += 1;
    if (treesBefore[i] >= treeHeight) {
      break;
    }
  }

  for (let i = 0; i < treesAfter.length; i += 1) {
    treeClearences[1] += 1;
    if (treesAfter[i] >= treeHeight) {
      break;
    }
  }

  return treeClearences;
};

const scoreEachTree = (grid) => {
  const scores = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((tree, columnIndex) => {
      const column = grid.map((x) => x[columnIndex]);
      const [score1, score2] = calculateClearenceEachDirection(row, columnIndex);
      const [score3, score4] = calculateClearenceEachDirection(column, rowIndex);

      const treeScore = score1 * score2 * score3 * score4;
      scores.push(treeScore);
    });
  });
  return scores;
};

readFileLineByLine('./input/day8.txt', lineHandlerFunction).then(() => {
  const treeScores = scoreEachTree(treeGrid);
  treeScores.sort((a, b) => a - b);
  console.log(treeScores[treeScores.length - 1]);
});
