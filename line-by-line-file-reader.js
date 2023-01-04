const fs = require('fs');
const readline = require('readline');

const readFileLineByLine = async (filepath, lineHandler, ...others) => {
  const fileStream = fs.createReadStream(filepath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  // eslint-disable-next-line no-restricted-syntax
  for await (const line of rl) {
    lineHandler(line, ...others);
  }
};

module.exports = readFileLineByLine;
