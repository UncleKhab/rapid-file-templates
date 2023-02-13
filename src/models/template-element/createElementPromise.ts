import { ensureDir, writeFile } from "fs-extra";
import { logFileReject, logFileSuccess } from "../../helpers/messages";
import { TemplateElement, TemplateElementTypes } from "./types";

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
      return async () =>
        new Promise((resolve, reject) => {
          writeFile(`${path}/${name}`, content[0])
            .then(() => {
              logFileSuccess(name, indent);
              resolve(true);
            })
            .catch((error) => {
              logFileReject(name, indent);
              reject(error);
            });
        });
    case TemplateElementTypes.Folder:
      return async () =>
        new Promise((resolve, reject) => {
          ensureDir(`${path}/${name}`)
            .then(() => {
              logFileSuccess(name, indent);
              resolve(true);
            })
            .catch((error) => {
              logFileReject(name, indent);
              reject(error);
            });
        });
  }
};

export default createElementPromise;
