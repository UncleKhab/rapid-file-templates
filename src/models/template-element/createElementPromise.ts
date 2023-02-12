import { ensureDir, writeFile } from "fs-extra";
import { TemplateElement, TemplateElementTypes } from "./types";
import { logFileReject, logFileSuccess } from "helpers/messages";
const createElementPromise = (
  element: TemplateElement,
  path: string,
  indent: number = 0
): (() => Promise<any>) | null => {
  const { elementProps } = element;
  if (!elementProps) return null;

  const { content = "" } = element.elementProps;
  let name = element.elementProps.name || "";

  switch (element.type) {
    case TemplateElementTypes.File:
      return async () => {
        try {
          await writeFile(`${path}/${name}`, content[0]);
          logFileSuccess(name, indent);
        } catch (error) {
          logFileReject(name, indent);
        }
      };
    case TemplateElementTypes.Folder:
      return async () => {
        try {
          await ensureDir(`${path}/${name}`);
          logFileSuccess(name, indent);
        } catch (error) {
          logFileReject(name, indent);
        }
      };
  }
};

export default createElementPromise;
