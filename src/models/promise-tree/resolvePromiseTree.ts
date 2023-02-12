import { PromiseTree } from "./types";

export default async function resolvePromiseTree(tree: PromiseTree | null) {
  if (!tree) return 404;
  try {
    if (!tree.rest) {
      await tree.promise?.();
      return;
    }
    await tree.promise?.();
    tree.rest.forEach(async (branch) => {
      !!branch && (await resolvePromiseTree(branch));
    });
    return true;
  } catch (error) {
    //console.log(error);
  }
}
