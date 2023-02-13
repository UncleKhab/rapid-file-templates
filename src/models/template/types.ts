import { MergeField } from "../merge-field/types";
import { TemplateElement } from "../template-element/types";

export type TemplateStructure = {
  name: string;
  root: TemplateElement;
  enablePrettier?: boolean;
  fileName?: string;
  mergeFields?: MergeField[];
};
