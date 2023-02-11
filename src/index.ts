#! /usr/bin/env node
import { program } from "commander";
import { readJSON } from "fs-extra";
import makeAction from "./actions/make";
import defaultTemplate from "./models/template/component";
import { TemplateStructure } from "./models/template/template";

program
  .command("make")
  .argument("<path>", "The path at which you want to generate files")
  .option("-c, --config <string>", "The name of the template you want to use")
  .option("-f, --filename <string>", "The name that will be applied in the {fileName} handlebar")
  .description("Generates files based on specified file-config")
  .action(async (path, argv) => {
    try {
      const templatesList: Record<string, TemplateStructure> = await readJSON(
        path + "/unq.config.json"
      );
      let template: TemplateStructure = defaultTemplate;
      if (argv.config && templatesList.hasOwnProperty(argv.config))
        template = templatesList[argv.config];
      if (argv.fileName) template.fileName = argv.fileName;

      makeAction(template as TemplateStructure, "./" + path);
    } catch (error) {
      // TODO -> Error handler
    }
  });

program.parse();

const options = program.opts();
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
