const readFileLineByLine = require('./line-by-line-file-reader');

const treeGrid = [];

const lineHandlerFunction = (input) => {
  treeGrid.push([...input]);
};

const isTreeVisibleFromEitherDirection = (trees, treeIndex) => {
  const treeHeight = trees[treeIndex];
  if (treeIndex === 0 || treeIndex === trees.length - 1) {
    return true;
  }
  const treesBefore = trees.slice(0, treeIndex);
  if (treesBefore.find((t) => t >= treeHeight) === undefined) {
    return true;
  }
  const treesAfter = trees.slice(treeIndex + 1, trees.length);
  if (treesAfter.find((t) => t >= treeHeight) === undefined) {
    return true;
  }
  return false;
};

const checkEachTree = (grid) => {
  let visibleTrees = 0;
  grid.forEach((row, rowIndex) => {
    row.forEach((tree, columnIndex) => {
      const column = grid.map((x) => x[columnIndex]);
      if (
        isTreeVisibleFromEitherDirection(row, columnIndex)
        || isTreeVisibleFromEitherDirection(column, rowIndex)
      ) {
        visibleTrees += 1;
      }
    });
  });
  return visibleTrees;
};

readFileLineByLine('./input/day8.txt', lineHandlerFunction).then(() => {
  const totalVisibleTrees = checkEachTree(treeGrid);

  console.log(totalVisibleTrees);
});
