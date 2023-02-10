export enum ElementType {
  Folder = "Folder",
  File = "File",
}

export type FileProps = {
  name: string;
  extension?: string;
  content?: string;
};
export type FolderProps = {
  name: string;
};

export interface Element {
  type: ElementType;
  description?: string;
  fileProps?: FileProps;
  folderProps?: FolderProps;
  elements?: Element[];
}
export type MergeField = {
  label: string;
  value: string;
};

export type TemplateStructure = {
  name: string;
  mergeFields?: MergeField;
  root: Element;
};
