import { MergeField } from "./types";

const replaceMergeFields = (value: string, mergeFields: MergeField[]) => {
  let newVal = value;
  mergeFields.forEach((mergeField) => {
    if (mergeField.value) {
      newVal = newVal.replaceAll(mergeField.label, mergeField.value || "");
    } else if (mergeField.defaultValue) {
      newVal = newVal.replaceAll(mergeField.label, mergeField.defaultValue);
    }
  });
  return newVal;
};

export default replaceMergeFields;
