import { MergeField } from "../../types";
import { TemplateElement } from "./template-element";

export type TemplateStructure = {
  name: string;
  root: TemplateElement;
  fileName?: string;
  mergeFields?: MergeField;
};
