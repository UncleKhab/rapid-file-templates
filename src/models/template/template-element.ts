export enum TemplateElementTypes {
  Folder = "Folder",
  File = "File",
}
export interface TemplateElement {
  type: TemplateElementTypes;
  elementProps: TemplateElementProps;
  description?: string;
  elements?: TemplateElement[];
}

export type TemplateElementProps = {
  name: string;
  content?: string[];
};
