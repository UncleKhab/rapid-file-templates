export type PromiseTree = {
  promise: (() => Promise<any>) | null;
  failMessage?: string;
  rest?: (PromiseTree | null)[];
};
