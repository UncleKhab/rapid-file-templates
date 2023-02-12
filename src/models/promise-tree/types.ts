export type PromiseTree = {
  promise: (() => Promise<any>) | null;
  rest?: (PromiseTree | null)[];
};
