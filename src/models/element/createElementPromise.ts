import { ensureDir, writeFile } from "fs-extra";
import { TemplateElement, TemplateElementTypes } from "../template/template-element";

const createElementPromise = (
  element: TemplateElement,
  path: string
): (() => Promise<any>) | null => {
  const { elementProps } = element;
  if (!elementProps) return null;

  const { content = "" } = element.elementProps;
  let name = element.elementProps.name || "";

  switch (element.type) {
    case TemplateElementTypes.File:
      return () => {
        console.log(`Generated file ${name} at ${path}`);
        return writeFile(`${path}/${name}`, content[0]);
      };
    case TemplateElementTypes.Folder:
      return () => {
        console.log(`Generated folder ${name} at ${path}`);
        return ensureDir(`${path}/${name}`);
      };
  }
};

export default createElementPromise;
