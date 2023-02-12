import buildPromiseTree from "models/promise-tree/buildPromiseTree";
import { templateState } from "index";
import resolvePromiseTree from "models/promise-tree/resolvePromiseTree";

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
