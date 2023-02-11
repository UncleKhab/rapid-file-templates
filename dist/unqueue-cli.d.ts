#! /usr/bin/env node
declare module "types/index" {
    export type MergeField = {
        label: string;
        value: string;
    };
}
declare module "models/template/template-element" {
    export enum TemplateElementTypes {
        Folder = "Folder",
        File = "File"
    }
    export interface TemplateElement {
        type: TemplateElementTypes;
        elementProps: TemplateElementProps;
        description?: string;
        elements?: TemplateElement[];
    }
    export type TemplateElementProps = {
        name: string;
        extension?: string;
        content?: string;
    };
}
declare module "models/template/template" {
    import { MergeField } from "types/index";
    import { TemplateElement } from "models/template/template-element";
    export type TemplateStructure = {
        name: string;
        mergeFields?: MergeField;
        root: TemplateElement;
    };
}
declare module "models/template/component" {
    import { TemplateStructure } from "models/template/template";
    const ComponentStructure: TemplateStructure;
    export default ComponentStructure;
}
declare module "models/promise-tree/createElementPromise" {
    import { TemplateElement } from "models/template/template-element";
    const createElementPromise: (element: TemplateElement, path: string) => (() => Promise<any>) | null;
    export default createElementPromise;
}
declare module "models/promise-tree/promise-tree" {
    import { TemplateElement } from "models/template/template-element";
    export type PromiseTree = {
        promise: (() => Promise<any>) | null;
        rest?: (PromiseTree | null)[];
    };
    function buildPromiseTree(element: TemplateElement, path: string): PromiseTree | null;
    function resolvePromiseTree(tree: PromiseTree | null): Promise<404 | undefined>;
    export { buildPromiseTree, resolvePromiseTree };
}
declare module "actions/make" {
    function makeAction(path: string): Promise<void>;
    export default makeAction;
}
declare module "index" { }
declare module "helpers/replaceMergeFields" {
    import { MergeField } from "types/index";
    const replaceMergeFields: (value: string, mergeFields: MergeField[]) => string;
    export default replaceMergeFields;
}
