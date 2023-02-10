import { writeFile } from "fs-extra";
import { Element } from "../@types";

const writeFilePromise = (element: Element, path: string): (() => Promise<any>) | null => {
  const { fileProps } = element;
  if (!fileProps) return null;
  let name = fileProps?.name || "";

  const { content = "", extension = "" } = fileProps;

  if (extension) {
    name = name?.replace(/{extension}/g, extension);
  }

  return () => writeFile(`${path}/${name}`, content);
};

export default writeFilePromise;
