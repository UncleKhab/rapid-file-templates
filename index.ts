import { program } from "commander";
import makeAction from "./actions/make";
program
  .command("make <path>")
  .description("Make a folder using template")
  .option("-t, --template")
  .action((path) => makeAction(path));
program.parse();

const options = program.opts();

console.log(options);
