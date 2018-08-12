#!/usr/bin/env node

const program = require("commander");
const version = require("./package.json").version;

const init = require("./src/init");
const scrape = require("./src/scrape");

program.version(version);

program
  .command("init <title>")
  .description("initialises a new config file")
  .action(init);

program
  .command("scrape <filename>")
  .description("starts scraping using supplied config file")
  .option(
    "-o --output <filename>",
    "output file name (.csv/.json)",
    /\w{1,512}(.csv|.json)$/i
  )
  .action(scrape);

program.parse(process.argv);
