import { TemplateElement } from "models/template-element/types";
import { MergeField } from "models/merge-field/types";

export type TemplateStructure = {
  name: string;
  root: TemplateElement;
  enablePrettier?: boolean;
  fileName?: string;
  mergeFields?: MergeField[];
};
