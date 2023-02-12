import { TemplateElement, TemplateElementProps } from "../template/template-element";
import { templateState } from "../..";
import replaceMergeFields from "../../helpers/replaceMergeFields";
import prettier from "prettier";

export default function parseElement(element: TemplateElement) {
  const template = templateState.getState();
  const { mergeFields, enablePrettier } = template;
  const { content: rawContent = [""], name: rawName, parser } = element.elementProps;

  let parsedContent = [...rawContent].join("\n");
  let parsedName = "";

  if (mergeFields) {
    parsedName = replaceMergeFields(rawName, mergeFields);
    parsedContent = replaceMergeFields(parsedContent, mergeFields);
  }
  if (enablePrettier && parser) {
    parsedContent = prettier.format(parsedContent, { parser: parser });
  }

  const newProps: TemplateElementProps = {
    ...element.elementProps,
    content: [parsedContent],
    name: parsedName,
  };

  const parsedElement: TemplateElement = { ...element, elementProps: newProps };
  return parsedElement;
}
