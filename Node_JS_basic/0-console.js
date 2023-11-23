module.exports = function displayMessage(strArg) {
  process.stdin.write(`${strArg}\n`);
};
