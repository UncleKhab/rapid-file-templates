import { Element, ElementType } from "../@types";
import ComponentStructure from "../dummy_data/component";
import writeFilePromise from "../helpers/writeFilePromise";
import writeFolderPromise from "../helpers/writeFolderPromise";

type PromiseTree = {
  current: (() => Promise<any>) | null;
  rest?: PromiseTree[];
};
function reccuriveBuildElementPromises(element: Element, path: string): PromiseTree {
  switch (element.type) {
    case ElementType.File:
      return { current: writeFilePromise(element, path) };
    case ElementType.Folder:
      let elements: any[] = [];
      if (element.elements) {
        elements = element.elements.map((item) =>
          reccuriveBuildElementPromises(item, `${path}/${element.folderProps?.name}`)
        );
      }
      const currentPromise = writeFolderPromise(element, path);
      return { current: currentPromise, rest: elements };
  }
}

async function resolveReccursiveTree(tree: PromiseTree) {
  try {
    if (!tree.rest) {
      await tree.current?.();
      return;
    }
    await tree.current?.();
    tree.rest.forEach(async (branch) => await resolveReccursiveTree(branch));
  } catch (error) {
    console.log(error);
  }
}

async function makeAction(path: string) {
  const promises = reccuriveBuildElementPromises(ComponentStructure.root, path);
  console.log(path);
  const folderPromise = writeFolderPromise(ComponentStructure.root, path);
  resolveReccursiveTree(promises);
}

export default makeAction;
