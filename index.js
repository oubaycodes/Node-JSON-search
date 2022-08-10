const fs = require("fs/promises");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`Which model do you want`, (name) => {
  console.log(`${name}!`);
  readline.close();
});
