import { readJSON } from "fs-extra";
import { MergeField } from "models/merge-field/types";
import defaultTemplate from "./defaultTemplate";
import { TemplateElement } from "../template-element/types";
import inquirer, { InputQuestion } from "inquirer";

export type TemplateStructure = {
  name: string;
  root: TemplateElement;
  enablePrettier?: boolean;
  fileName?: string;
  mergeFields?: MergeField[];
};

export async function loadTemplatesFile(argv: any) {
  try {
    // READING TEMPLATES FROM unq.config.json
    const templatesList: Record<string, TemplateStructure> = await readJSON("./unq.config.json");
    // SETING THE DEFAULT TEMPLATE
    let template: TemplateStructure = defaultTemplate;

    // ARGV APPLICATION
    if (argv.config && templatesList.hasOwnProperty(argv.config))
      template = templatesList[argv.config];
    if (argv.fileName) template.fileName = argv.fileName;

    // LOADING THE MERGEFIELDS
    if (template.mergeFields) {
      const populatedMergeFields: MergeField[] = [];
      try {
        for (let i = 0; i < template.mergeFields?.length; i++) {
          const currentMergeField = template.mergeFields[i];
          const question: InputQuestion = {
            message: `Value for ${currentMergeField.label}:`,
            name: `response`,
            type: "input",
          };
          const response = await inquirer.prompt([question]).then((data) => data.response);
          currentMergeField.value = response;
          populatedMergeFields.push(currentMergeField);
        }
      } catch (error) {
        // TODO -> Error handler
      }
      template.mergeFields = [...populatedMergeFields];
    }

    return template;
  } catch (error) {
    // TODO -> Handle error
  }
}
