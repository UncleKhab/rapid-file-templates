import { MergeField } from "../types";

const replaceMergeFields = (value: string, mergeFields: MergeField[]) => {
  return mergeFields.reduce((state, mergeField) => {
    state.replace(mergeField.label, mergeField.value);
    return state;
  }, value);
};

export default replaceMergeFields;
