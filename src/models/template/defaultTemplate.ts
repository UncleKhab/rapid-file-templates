import { TemplateStructure } from "./template";
import { TemplateElementTypes } from "../template-element/types";

const defaultTemplate: TemplateStructure = {
  name: "SimpleComponent",
  root: {
    type: TemplateElementTypes.Folder,
    elementProps: { name: "default" },
    elements: [
      {
        type: TemplateElementTypes.File,
        elementProps: {
          name: "default.tsx",
          content: [``],
        },
      },
    ],
  },
};

export default defaultTemplate;
