import { TemplateStructure } from "../models/template/template";

function createTemplateState(template: TemplateStructure | null) {
  const state = [JSON.parse(JSON.stringify(template))];

  function setState(newStateValue: TemplateStructure) {
    state[0] = JSON.parse(JSON.stringify(newStateValue));
  }
  function getState(): TemplateStructure {
    return state[0];
  }

  return { setState, getState };
}

export default createTemplateState;
