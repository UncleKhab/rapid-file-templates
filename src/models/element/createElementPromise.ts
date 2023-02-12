import { ensureDir, writeFile } from "fs-extra";
import parseElement from "./parseElement";
import { TemplateElement, TemplateElementTypes } from "../template/template-element";

const createElementPromise = (
  element: TemplateElement,
  path: string
): (() => Promise<any>) | null => {
  const { elementProps } = element;
  if (!elementProps) return null;

  const parsedElement = parseElement(element);
  const { content = "" } = parsedElement.elementProps;
  let name = parsedElement.elementProps.name || "";

  switch (element.type) {
    case TemplateElementTypes.File:
      return () => writeFile(`${path}/${name}`, content[0]);
    case TemplateElementTypes.Folder:
      return () => ensureDir(`${path}/${name}`);
  }
};

export default createElementPromise;
