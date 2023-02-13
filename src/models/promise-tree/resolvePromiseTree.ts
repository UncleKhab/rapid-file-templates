import { UnqError } from "helpers/errors";
import { logError } from "helpers/messages";
import { PromiseTree } from "./types";

// Resolve the tree from root to leafs
// One of the reasons for not flattening the tree and using Promise.all() is that
// We need to wait for the current node to finish before continuing to the branches
// If for example we don't wait to solve a Promise that creates a folder, it's branches might fail.

// I've used a classic for loop because of the need to "await"

const COMPLETED_TO_SOLVE_MESSAGE: UnqError = {
  status: 203,
  message: "Genenarated template at path",
};

export default async function resolvePromiseTree(tree: PromiseTree | null) {
  if (!tree) return { status: 404, message: "Promise tree not found" };
  try {
    await tree.promise?.();
    if (tree.rest) {
      // When we have branches we want to return the result of those branches
      // In case one fails we can catch the correct error
      for (let i = 0; i < tree.rest.length; i++) {
        const branch = tree.rest[i];
        if (branch) {
          const branchesResult = await resolvePromiseTree(branch);
          if (branchesResult.status >= 400) {
            throw new Error(branchesResult.message);
          }
        }
      }
    }
  } catch (error: any) {
    return { status: 500, message: error.message ? error.message : `${tree.failMessage}` };
  }
  return COMPLETED_TO_SOLVE_MESSAGE;
}
