const fs = require("fs/promises");
const http = require("http");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const findModel = async function (name) {
  try {
    const jsonData = await fs.readFile("./data.json", "utf-8");
    const dataObj = JSON.parse(jsonData);
    const modelResult = dataObj.find(
      (model) => model.modelName.toLowerCase() === name.toLowerCase()
    );
    if (!modelResult) throw new Error("No result found!");
    console.log(modelResult);
  } catch (err) {
    console.error(`Unexpected error: ${err.message}`);
  }
};
const server = http.createServer((req, res) => {
  console.log("shit");
});

readline.question(`Which model do you want:\n`, (name) => {
  findModel(name);
  server.listen(8000, () => {
    console.log(`Listening on port ${server.address().port}`);
  });
  readline.close;
});
