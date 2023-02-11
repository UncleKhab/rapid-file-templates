#! /usr/bin/env node
import { program } from "commander";
import makeAction from "./actions/make";

program
  .version("1.0.1")
  .command("make <path>")
  .description("Make a folder using template")
  .option("-t, --template")
  .parse(process.argv)
  .action((path) => makeAction("./" + path));

program.parse();

const options = program.opts();
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
