import { TemplateElement } from "../template/template-element";
import { templateState } from "../..";
import replaceMergeFields from "../../helpers/replaceMergeFields";
import prettier from "prettier";

export default function parseElement(element: TemplateElement) {
  const template = templateState.getState();
  const mergeFields = template.mergeFields;
  let parsedContent = "";
  if (element.elementProps.content) {
    const newContent: string[] = [...element.elementProps.content];
    parsedContent = newContent.join("\n");
  }
  let parsedName = element.elementProps.name;

  if (mergeFields) {
    parsedName = replaceMergeFields(parsedName, mergeFields);
    parsedContent = replaceMergeFields(parsedContent, mergeFields);
  }

  parsedContent = prettier.format(parsedContent, { parser: "babel-ts" });

  element.elementProps.content = [parsedContent];
  element.elementProps.name = parsedName;

  return element;
}
