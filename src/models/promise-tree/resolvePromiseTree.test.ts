import resolvePromiseTree, { COMPLETED_TO_SOLVE_MESSAGE } from "./resolvePromiseTree";
import { PromiseTree } from "./types";

describe("resolvePromiseTree", () => {
  it("returns a 404 error when the promise tree is not found", async () => {
    const result = await resolvePromiseTree(null);
    expect(result).toEqual({ status: 404, message: "Promise tree not found" });
  });

  it("returns the result of resolved branches when all branches succeed", async () => {
    const tree: PromiseTree = {
      promise: () => Promise.resolve(),
      rest: [
        {
          promise: () => Promise.resolve(),
        },
        {
          promise: () => Promise.resolve(),
        },
      ],
    };
    const result = await resolvePromiseTree(tree);
    expect(result).toEqual(COMPLETED_TO_SOLVE_MESSAGE);
  });

  it("returns the first error that occurs when one of the branches fails", async () => {
    const tree: PromiseTree = {
      promise: () => Promise.resolve(),
      rest: [
        {
          promise: () => Promise.reject(new Error("Branch 1 failed")),
        },
        {
          promise: () => Promise.resolve(),
        },
      ],
    };
    const result = await resolvePromiseTree(tree);
    expect(result).toEqual({ status: 500, message: "Branch 1 failed" });
  });

  it("returns the fail message if one of the branches fails and does not have an error message", async () => {
    const tree: PromiseTree = {
      promise: () => Promise.resolve(),
      rest: [
        {
          promise: () => Promise.reject(),
          failMessage: "Branch 1 failed without error message",
        },
        {
          promise: () => Promise.resolve(),
        },
      ],
    };
    const result = await resolvePromiseTree(tree);
    expect(result).toEqual({ status: 500, message: "Branch 1 failed without error message" });
  });
});
