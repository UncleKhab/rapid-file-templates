import { readJSON } from "fs-extra";
import { MergeField } from "../../types";
import defaultTemplate from "./component";
import { TemplateElement } from "./template-element";
import inquirer, { InputQuestion } from "inquirer";

export type TemplateStructure = {
  name: string;
  root: TemplateElement;
  fileName?: string;
  mergeFields?: MergeField;
};

export async function loadTemplatesFile(argv: any) {
  try {
    const templatesList: Record<string, TemplateStructure> = await readJSON("./unq.config.json");
    let template: TemplateStructure = defaultTemplate;

    if (argv.config && templatesList.hasOwnProperty(argv.config))
      template = templatesList[argv.config];
    if (argv.fileName) template.fileName = argv.fileName;
    console.log(template.mergeFields);
    if (template.mergeFields) {
      const populatedMergeFields: MergeField[] = [];

      try {
        for (let i = 0; i < populatedMergeFields.length; i++) {
          const currentMergeField = populatedMergeFields[i];
          const question: InputQuestion = {
            message: `What is the value of ${currentMergeField.label}`,
            name: `${currentMergeField.label}`,
            type: "input",
          };
          const result = await inquirer.prompt([question]);
          console.log(result);
        }
      } catch (error) {
        // TODO -> Error handler
      }
    }

    return template;
  } catch (error) {
    // TODO -> Handle error
  }
}
