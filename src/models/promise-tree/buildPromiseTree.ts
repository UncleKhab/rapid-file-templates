import createElementPromise from "../template-element/createElementPromise";
import parseElement from "../template-element/parseElement";
import { TemplateElement, TemplateElementTypes } from "../template-element/types";
import { PromiseTree } from "./types";

export default function buildPromiseTree(
  element: TemplateElement,
  path: string
): PromiseTree | null {
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
