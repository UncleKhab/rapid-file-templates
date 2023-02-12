import { MergeField } from "../types";

const replaceMergeFields = (value: string, mergeFields: MergeField[]) => {
  let newVal = value;
  mergeFields.forEach((mergeField) => {
    newVal = newVal.replaceAll(mergeField.label, mergeField.value || "");
  });
  return newVal;
};

export default replaceMergeFields;
