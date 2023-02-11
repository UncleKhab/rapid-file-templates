import { buildPromiseTree, resolvePromiseTree } from "../models/promise-tree/promise-tree";
import { templateState } from "..";

async function make(path: string) {
  const config = templateState.getState();
  const promises = buildPromiseTree(config.root, path);
  try {
    await resolvePromiseTree(promises);
  } catch (error) {
    // TODO -> Error handler
  }
}

export default make;
