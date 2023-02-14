import { readJSON } from "fs-extra";
import defaultTemplate from "./defaultTemplate";
import { TemplateElement } from "../template-element/types";
import inquirer, { InputQuestion } from "inquirer";
import { MergeField } from "../merge-field/types";

export type TemplateStructure = {
  root: TemplateElement;
  enablePrettier?: boolean;
  fileName?: string;
  mergeFields?: MergeField[];
};

export async function loadTemplatesFile(argv: any) {
  try {
    // READING TEMPLATES FROM rapid.config.json
    const templatesList: Record<string, TemplateStructure> = await readJSON("./rapid.config.json");
    // SETING THE DEFAULT TEMPLATE
    let template: TemplateStructure = defaultTemplate;

    // Retrieving the template
    if (argv.template && templatesList.hasOwnProperty(argv.template))
      template = templatesList[argv.template];
    else {
      // TODO -> Template not found
    }

    // LOADING THE MERGEFIELDS
    if (template.mergeFields) {
      const populatedMergeFields: MergeField[] = [];
      try {
        for (let i = 0; i < template.mergeFields?.length; i++) {
          const currentMergeField = template.mergeFields[i];
          let questionMessage = `Value for ${currentMergeField.label}:`;
          if (currentMergeField.defaultValue) {
            questionMessage = `default: ${currentMergeField.defaultValue} ` + questionMessage;
          }
          const question: InputQuestion = {
            message: questionMessage,
            name: `response`,
            type: "input",
          };
          const response = await inquirer.prompt([question]).then((data) => data.response); // TODO -> Make fn for this
          if (response) {
            currentMergeField.value = response;
          }

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
