#! /usr/bin/env node
import { program } from "commander";
import makeAction from "./actions/make";
import { logError } from "./helpers/messages";
import { loadTemplatesFile } from "./models/template/template";
import createTemplateState from "./state/createTemplateState";

export const templateState = createTemplateState(null);

program
  .command("make")
  .argument("<path>", "The path at which you want to generate files")
  .option("-t, --template <string>", "The name of the template you want to use")
  .option("-f, --filename <string>", "The name that will be applied in the {fileName} handlebar")
  .description("Generates files based on specified file-config")
  .action(async (path, argv) => {
    try {
      const template = await loadTemplatesFile(argv);
      if (!template) throw new Error(`404 - ${argv.config} not found`);
      templateState.setState(template);
      await makeAction("./" + path);
    } catch (error: any) {
      logError(error);
    }
  });

program.parse();

const options = program.opts();
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
