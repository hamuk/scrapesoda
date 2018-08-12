const fs = require("fs");

const load = name => {
  try {
    const contents = fs.readFileSync(name, "utf8");
    return contents;
  } catch (err) {
    throw new Error("failed to load file");
  }
};

const writeJson = (name, json) => {
  try {
    fs.writeFileSync(name, JSON.stringify(json, null, 2));
  } catch (err) {
    throw new Error("failed to write json file");
  }
};

const writeCsv = (name, json) => {
  try {
    fs.writeFileSync(name, "hello,there");
  } catch (err) {
    throw new Error("failed to write jscsvon file");
  }
};

module.exports = {
  load,
  loadJson: name => JSON.parse(load(name)),
  writeJson,
  writeCsv
};
