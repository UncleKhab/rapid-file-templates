import replaceMergeFields from "./replaceMergeFields";
import { MergeField } from "./types";

describe("replaceMergeFields", () => {
  it("replaces all instances of the merge field label with its value", () => {
    const value = "Hello, {{Name}}! How are you doing {{today}}?";
    const mergeFields = [
      { label: "{{Name}}", value: "John" },
      { label: "{{today}}", value: "today" },
    ];
    const result = replaceMergeFields(value, mergeFields);

    expect(result).toBe("Hello, John! How are you doing today?");
  });

  it("replaces all instances of the merge field label will stay the same if its value is not provided", () => {
    const value = "Hello, {{Name}}! How are you doing {{today}}?";
    const mergeFields = [{ label: "{{Name}}" }, { label: "{{today}}" }];
    const result = replaceMergeFields(value, mergeFields);

    expect(result).toBe("Hello, {{Name}}! How are you doing {{today}}?");
  });

  it("returns the original value if the merge fields array is empty", () => {
    const value = "Hello, {{Name}}! How are you doing {{today}}?";
    const mergeFields: MergeField[] = [];
    const result = replaceMergeFields(value, mergeFields);

    expect(result).toBe(value);
  });
});
