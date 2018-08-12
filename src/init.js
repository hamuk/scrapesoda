const chalk = require("chalk");

const config = require("../lib/config");
const file = require("../lib/file");

module.exports = rawTitle => {
  // clean the options
  const title = rawTitle
    .trim()
    .replace(/ /g, "-")
    .toLowerCase()
    .substr(0, 512);

  if (title.length < 1) {
    console.error(chalk.red.bold("parsed title invalid"));
    return;
  }

  console.log(
    chalk.green("initialising config with title: ") + chalk.green.bold(title)
  );

  // write the file
  const json = config.default(title);
  file.writeJson(`${title}.json`, json);
};
