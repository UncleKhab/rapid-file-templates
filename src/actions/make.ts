import { logError, logHeader, logSuccess } from "helpers/messages";
import parsePath from "helpers/parsePath";
import { templateState } from "index";
import buildPromiseTree from "models/promise-tree/buildPromiseTree";
import resolvePromiseTree from "models/promise-tree/resolvePromiseTree";

async function make(path: string) {
  const config = templateState.getState();
  const promises = buildPromiseTree(config.root, path);
  try {
    logHeader(`\nGenerating at path: ${parsePath(path)}\n`);
    const result = await resolvePromiseTree(promises).then((data) => data);

    if (result?.status < 400) {
      logSuccess(`\n${result.message} ${parsePath(path)}\n`);
    } else {
      throw new Error(result.message);
    }
  } catch (error: any) {
    console.log(error);
  }
}

export default make;
