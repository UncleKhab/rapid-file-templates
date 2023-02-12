import { logHeader } from "helpers/messages";
import { templateState } from "index";
import buildPromiseTree from "models/promise-tree/buildPromiseTree";
import resolvePromiseTree from "models/promise-tree/resolvePromiseTree";

async function make(path: string) {
  const config = templateState.getState();
  const promises = buildPromiseTree(config.root, path);
  try {
    logHeader(`\nGenerating at path: ${path}`);
    await resolvePromiseTree(promises);
    // TODO this does not wait
  } catch (error) {
    // TODO -> Error handler
  }
}

export default make;
