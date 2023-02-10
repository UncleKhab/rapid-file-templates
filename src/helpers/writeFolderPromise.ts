import { ensureDir } from "fs-extra";
import { Element } from "../@types";

const writeFolderPromise = (element: Element, path: string): (() => Promise<any>) | null => {
  const { folderProps } = element;
  if (!folderProps) return null;
  const { name } = folderProps;
  return () => ensureDir(`${path}/${name}`);
};

export default writeFolderPromise;
