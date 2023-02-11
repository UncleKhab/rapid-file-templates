import { ensureDir, writeFile } from "fs-extra";
import { TemplateElement, TemplateElementTypes } from "../template/template-element";

const createElementPromise = (
  element: TemplateElement,
  path: string
): (() => Promise<any>) | null => {
  const { elementProps } = element;
  if (!elementProps) return null;
  let name = elementProps?.name || "";

  const { content = "", extension = "" } = elementProps;

  if (extension) {
    name = name?.replace(/{extension}/g, extension);
  }

  switch (element.type) {
    case TemplateElementTypes.File:
      return () => writeFile(`${path}/${name}`, content);
    case TemplateElementTypes.Folder:
      return () => ensureDir(`${path}/${name}`);
  }
};

export default createElementPromise;
