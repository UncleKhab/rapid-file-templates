import { TemplateStructure } from "./template";
import { TemplateElementTypes } from "./template-element";

const defaultTemplate: TemplateStructure = {
  name: "SimpleComponent",
  root: {
    type: TemplateElementTypes.Folder,
    elementProps: { name: "fileName" },
    elements: [
      {
        type: TemplateElementTypes.File,
        elementProps: {
          name: "main.{extension}.tsx",
          extension: "component",
          content: ``,
        },
      },
      {
        type: TemplateElementTypes.File,
        elementProps: {
          name: "styles.ts",
          extension: "styles",
          content: ``,
        },
      },
    ],
  },
};

export default defaultTemplate;
