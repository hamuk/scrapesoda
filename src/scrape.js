const chalk = require("chalk");
const path = require("path");

const file = require("../lib/file");
const validateConfig = require("../lib/config").validate;
const processSelectors = require("./processSelectors");

module.exports = async (filename, options) => {
  try {
    // validate the options
    const outputFilename =
      typeof options.output === "string" ? options.output : "results.json";
    const outputFormat = path.extname(outputFilename);

    console.log(
      chalk.green("scraping using file: " + chalk.green.bold(filename))
    );

    // parse the config file
    const config = file.loadJson(filename);
    validateConfig(config);

    console.log(
      chalk.cyan(
        "parsed config file: " +
          chalk.cyan.bold(`${config.title} (${config.url})`)
      )
    );

    // actually do the scraping now
    const results = [];
    await processSelectors(config.selectors, config.url, config.delay, results);

    // write the results to a file
    console.log(
      chalk.yellow("writing results to: " + chalk.yellow.bold(outputFilename))
    );

    switch (outputFormat) {
      case ".csv":
        file.writeCsv(outputFilename, results);
        break;
      case ".json":
        file.writeJson(outputFilename, results);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error(chalk.red(`error: ${err.message}`));
  }
};
