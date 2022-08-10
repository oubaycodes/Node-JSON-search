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

    return modelResult;
  } catch (err) {
    console.error(`Unexpected error: ${err.message}`);
  }
};

const replaceTemplate = async function (template, dataObj) {
  const foo = await dataObj;
  const templateData = await fs.readFile(template, "utf-8");
  let output = templateData.replaceAll("{%MODELNAME%}", dataObj.modelName);
  output = output.replaceAll("{%QUANTITY%}", dataObj.quantity);
  output = output.replaceAll("{%SCREENPRICE%}", dataObj.screenPrice);
  return output;
};
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  // console.log(template);
  // res.end(template);
  readline.close();
});
readline.question(`Which model do you want:\n`, (modelName) => {
  server.listen(8000, () => {
    console.log(`Listening on port ${server.address().port}`);
  });

  replaceTemplate("./templates/productTemplate.html", findModel(modelName));
});
