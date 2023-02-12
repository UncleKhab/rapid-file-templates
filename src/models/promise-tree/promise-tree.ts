import createElementPromise from "../element/createElementPromise";
import parseElement from "../element/parseElement";
import { TemplateElement, TemplateElementTypes } from "../template/template-element";

export type PromiseTree = {
  promise: (() => Promise<any>) | null;
  rest?: (PromiseTree | null)[];
};

function buildPromiseTree(element: TemplateElement, path: string): PromiseTree | null {
  if (!element) return null;

  const parsedElement = parseElement(element);
  const currentPromise = createElementPromise(parsedElement, path);
  switch (element.type) {
    case TemplateElementTypes.File:
      return { promise: currentPromise };
    case TemplateElementTypes.Folder:
      let elements: (PromiseTree | null)[] = [];
      if (parsedElement.elements) {
        elements = parsedElement.elements.map((item) =>
          buildPromiseTree(item, `${path}/${parsedElement.elementProps?.name}`)
        );
      }
      return { promise: currentPromise, rest: elements };
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
    //console.log(error);
  }
}

export { buildPromiseTree, resolvePromiseTree };
