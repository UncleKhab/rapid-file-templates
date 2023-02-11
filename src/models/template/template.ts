import { MergeField } from "../../types";
import { TemplateElement } from "./template-element";

export type TemplateStructure = {
  name: string;
  mergeFields?: MergeField;
  root: TemplateElement;
};
