const inputFile = require("./inputFile.json");
const utils = require("./utils");

const output = [];

inputFile.forEach(input => {
  const result = { ...input };
  const { alphabet, rowLength, startingFocus, word } = input;

  const keyboard = utils.createKeyboard(alphabet, rowLength);

  const { distance, path } = utils.shortestPathOnKeyboard(keyboard, startingFocus, word);
  result.distance = distance;
  result.path = path;
  output.push(result);
});

console.log(output);
