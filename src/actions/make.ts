import { buildPromiseTree, resolvePromiseTree } from "../models/promise-tree/promise-tree";
import { TemplateStructure } from "../models/template/template";

async function make(config: TemplateStructure, path: string) {
  const promises = buildPromiseTree(config.root, path);
  try {
    await resolvePromiseTree(promises);
  } catch (error) {
    // TODO -> Error handler
  }
}

export default make;
