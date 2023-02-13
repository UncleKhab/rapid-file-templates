import createElementPromise from "../template-element/createElementPromise";
import parseElement from "../template-element/parseElement";
import { TemplateElement, TemplateElementTypes } from "../template-element/types";
import { PromiseTree } from "./types";

export default function buildPromiseTree(
  element: TemplateElement,
  path: string,
  indent: number = 2
): PromiseTree | null {
  if (!element) return null;

  const parsedElement = parseElement(element);
  const currentPromise = createElementPromise(parsedElement, path, indent);

  switch (element.type) {
    case TemplateElementTypes.File:
      return { promise: currentPromise };
    case TemplateElementTypes.Folder:
      let elements: (PromiseTree | null)[] = [];
      if (parsedElement.elements) {
        elements = parsedElement.elements.map((item) =>
          buildPromiseTree(item, `${path}/${parsedElement.elementProps?.name}`, indent + 2)
        );
      }
      return {
        promise: currentPromise,
        failMessage: `${parsedElement.elementProps.name} failed to resolve`,
        rest: elements,
      };
  }
}
