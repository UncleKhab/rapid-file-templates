import ComponentStructure from "../models/template/component";
import { buildPromiseTree, resolvePromiseTree } from "../models/promise-tree/promise-tree";

async function makeAction(path: string) {
  const promises = buildPromiseTree(ComponentStructure.root, path);
  resolvePromiseTree(promises);
}

export default makeAction;
