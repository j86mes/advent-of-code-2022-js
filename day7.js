const readFileLineByLine = require('./line-by-line-file-reader');

// The challenge does not specify or contain absolute paths
// but my own challenge starts with cd /
// as such I will assume all challenges start with cd /
// because otherwise you would never know where the first set of commands
// are to be carried out. Even if you later on came across a folder named a
// you would never know if it was the same folder a you encountered prior
// to cd / because the folder structure could be e.g: /a/b/c/a/b/c/a/.

const splitOnce = (s, on) => {
  const [first, ...rest] = s.split(on);
  return [first, rest.length > 0 ? rest.join(on) : null];
};
const splitTwice = (s, on) => {
  const [first, second, ...rest] = s.split(on);
  return [first, second, rest.length > 0 ? rest.join(on) : null];
};

// eslint-disable-next-line arrow-body-style
const newDirectory = (name, parent) => {
  return {
    directories: [], files: [], name, parent,
  };
};
const newFileFromInput = (input) => {
  const parts = splitOnce(input, ' ');
  return { size: parts[0], name: parts[1] };
};

const getCurrentDirectory = (fileSystem) => {
  let currentDir = fileSystem;
  if (fileSystem.currentDirectory !== null) {
    currentDir = fileSystem.currentDirectory;
  }
  return currentDir;
};

const logDirectoryContents = (input, currentDir) => {
  if (input.startsWith('dir ')) {
    const directoryName = input.substring(4);
    if (currentDir.directories.find((d) => d === directoryName) === undefined) {
      currentDir.directories.push(newDirectory(directoryName, currentDir));
    }
  } else {
    const newFile = newFileFromInput(input);
    if (currentDir.files.find((f) => f.name === newFile) === undefined) {
      currentDir.files.push(newFile);
    }
  }
};

const handleCommand = (input, fileStructure) => {
  if (input.startsWith('$ cd')) {
    if (input === '$ cd /') {
      // eslint-disable-next-line no-param-reassign
      fileStructure.currentDirectory = null;
    } else if (input === '$ cd ..') {
      if (fileStructure.currentDirectory !== null) {
        // eslint-disable-next-line no-param-reassign
        fileStructure.currentDirectory = fileStructure.currentDirectory.parent;
      }
    } else {
      const parts = splitTwice(input, ' ');
      const currentDirectory = getCurrentDirectory(fileStructure);
      // eslint-disable-next-line max-len
      let targetDirectory = currentDirectory.directories.find((d) => d.name === parts[2]);
      if (targetDirectory === undefined) {
        targetDirectory = newDirectory(parts[2], currentDirectory);
        fileStructure.currentDirectory.directories.push(targetDirectory);
      }
      // eslint-disable-next-line no-param-reassign
      fileStructure.currentDirectory = targetDirectory;
    }
  }
};

const lineHandlerFunction = (input, fileStructure) => {
  if (input) {
    if (input.startsWith('$ ')) {
      handleCommand(input, fileStructure);
    } else {
      logDirectoryContents(input, getCurrentDirectory(fileStructure));
    }
  }
};

let totalOfEligibleFolders = 0;

const sumOfAllFiles = (directory, includeSubdirectories = true, callbackFn = null) => {
  let sum = 0;
  directory.files.forEach((f) => {
    sum += parseInt(f.size, 10);
  });
  if (includeSubdirectories) {
    directory.directories.forEach((d) => {
      sum += sumOfAllFiles(d, includeSubdirectories, callbackFn);
    });
  }
  if (callbackFn) {
    callbackFn(directory, sum);
  }
  return sum;
};

const tallyIfBelowLimit = (directory, size) => {
  if (size <= 100000) {
    totalOfEligibleFolders += size;
  }
};

const buildDirectorySizeList = (fileSystem) => {
  const allDirectorySizes = [];
  const logDirectorySize = (directory, size) => {
    allDirectorySizes.push({ directory: directory.name, size });
  };
  sumOfAllFiles(fileSystem, true, logDirectorySize);
  return allDirectorySizes;
};

const findSizeOfSmallestDirectoryWithMinimumSize = (fileSystem, amountToDelete) => {
  const sizes = buildDirectorySizeList(fileSystem);
  // eslint-disable-next-line arrow-body-style
  sizes.sort((a, b) => { return a.size - b.size; });
  // eslint-disable-next-line arrow-body-style
  return sizes.find((f) => { return f.size >= amountToDelete; }).size;
};

const rootDirectory = { ...newDirectory('/'), currentDirectory: null };
readFileLineByLine('./input/day7.txt', lineHandlerFunction, rootDirectory).then(() => {
  const sum = sumOfAllFiles(rootDirectory, true, tallyIfBelowLimit);
  console.log(`Total size: ${sum}`);
  console.log(`Total size of all eligible directories: ${totalOfEligibleFolders}`);

  const systemCapacity = 70000000;
  const spaceNeeded = 30000000;
  const amountToDelete = spaceNeeded - (systemCapacity - sum);
  // eslint-disable-next-line max-len
  const sizeOfsmallestEligibleDirectory = findSizeOfSmallestDirectoryWithMinimumSize(rootDirectory, amountToDelete);

  console.log(`Smallest directory to delete is: ${sizeOfsmallestEligibleDirectory}`);
});
