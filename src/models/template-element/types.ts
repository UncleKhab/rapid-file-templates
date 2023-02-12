import { BuiltInParserName } from "prettier";

export enum TemplateElementTypes {
  Folder = "Folder",
  File = "File",
}
export interface TemplateElement {
  type: TemplateElementTypes;
  elementProps: TemplateElementProps;
  enablePrettier?: boolean;
  description?: string;
  elements?: TemplateElement[];
}

export type TemplateElementProps = {
  name: string;
  content?: string[];
  parser?: BuiltInParserName;
};
