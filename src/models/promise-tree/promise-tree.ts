import createElementPromise from "./createElementPromise";
import { TemplateElement, TemplateElementTypes } from "../template/template-element";

export type PromiseTree = {
  promise: (() => Promise<any>) | null;
  rest?: (PromiseTree | null)[];
};

function buildPromiseTree(element: TemplateElement, path: string): PromiseTree | null {
  if (!element) return null;

  const currentElement = createElementPromise(element, path);
  switch (element.type) {
    case TemplateElementTypes.File:
      return { promise: currentElement };
    case TemplateElementTypes.Folder:
      let elements: (PromiseTree | null)[] = [];
      if (element.elements) {
        elements = element.elements.map((item) =>
          buildPromiseTree(item, `${path}/${element.elementProps?.name}`)
        );
      }
      return { promise: currentElement, rest: elements };
  }
}

async function resolvePromiseTree(tree: PromiseTree | null) {
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
  } catch (error) {
    console.log(error);
  }
}

export { buildPromiseTree, resolvePromiseTree };
