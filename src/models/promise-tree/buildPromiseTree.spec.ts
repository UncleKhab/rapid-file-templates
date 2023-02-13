import buildPromiseTree from "./buildPromiseTree";
import { TemplateElement, TemplateElementTypes } from "../template-element/types";

jest.mock("../template-element/createElementPromise", () =>
  jest.fn(() => Promise.resolve({ status: 203 }))
);
jest.mock("../template-element/parseElement", () =>
  jest.fn(() => ({ elementProps: { name: "placeholder" }, elements: [{}] }))
);

describe("buildPromiseTree", () => {
  it("returns null when the template element is not provided", () => {
    const result = buildPromiseTree(null, "");
    expect(result).toBeNull();
  });

  it("returns a promise tree with a single file node when the template element is a file", () => {
    const fileElement: TemplateElement = {
      type: TemplateElementTypes.File,
      elementProps: { name: "file1" },
    };
    const result = buildPromiseTree(fileElement, "");
    expect(result).toEqual({
      promise: expect.any(Promise),
    });
  });
});
