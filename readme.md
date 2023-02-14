# Rapid File Templates

Say goodbye to tedious and time-consuming manual file creation.

**The tool is designed to make it easy for you to generate common files for your projects and
eliminates the need for repetitive manual work.**

# Installation

To install the package , run the following command in your terminal:

    npm install --save-dev rapid-file-templates

Or you can install the package globally:

    npm install -g rapid-file-templates

Once the installation is complete, you should be able to run the command `rapid` in your terminal to
access the tool.

# Usage

    rapid make <path> -t <template-key>

- `<path>` is the destination path where the generated files will be placed.
- `<template-name>` is the name of the JSON template you want to use to generate the files.

## Example

**Add the rapid.config.json file in your project root folder**

## `rapid.config.json`

```
{
  "key-component": {
    "mergeFields": [
      { "label": "{{fileName}}", "defaultValue": "new-file-name" },
      { "label": "{{componentName}}", "defaultValue": "" },
      { "label": "{{cssClassName}}", "defaultValue": "container" }
    ],
    "enablePrettier": true,
    "root": {
      "type": "Folder",
      "elementProps": { "name": "{{fileName}}" },
      "elements": [
        {
          "type": "File",
          "elementProps": {
            "name": "{{fileName}}.tsx",
            "parser": "babel-ts",
            "content": [
              "import {FC} from 'react'",
              "import styles from './styles'",
              "type Props = {}",
              "const {{componentName}}:FC<Props> = (props) => {",
              "return <div className={styles.{{componentName}}Container}></div>",
              "}"
            ]
          }
        },
        {
          "type": "File",
          "elementProps": {
            "name": "styles.scss",
            "parser": "scss",
            "content": [
                ".{{cssClassName}} {",
                "border-radius: 1px solid black",
                "}"
                ]
          }
        }
      ]
    }
  }
}
```

**Using the above example you can configure your template in any way you want.  
Templates are accessed using the JSON file key, in the example above it's the "key-component"**

    rapid make ./src/ -t key-component

## `TemplateStructure`

The `TemplateStructure` type is used to define the structure of a template file. It is defined as an
object with the following properties:

### Properties

- `root` (required): a `TemplateElement` object representing the root element of the template file.
- `enablePrettier`: an optional boolean indicating whether to format the output using
  [Prettier](https://prettier.io/).
- `mergeFields`: an optional array of `MergeField` objects representing the merge fields in the
  template file.

## `TemplateElement`

A `TemplateElement` is an object that defines a single file or directory. A `TemplateElement` has
the following properties:

- `type` (required): The type of the `TemplateElement`. It can be either `"File"` or `"Folder`".
- `elementProps` (required): The properties of the `TemplateElement`. An object with the following
  properties:
  - `name` (required): The name of the file or directory.
  - `content`: An array of strings that define the contents of a file.
  - `parser` (optional): The name of a built-in
    [prettier parser](https://prettier.io/docs/en/options.html#parser) that will be used to parse
    the contents of a file.
- `elements` (optional): An array of `TemplateElement` objects that define the contents of a
  directory.

## `MergeField`

The `MergeField` type is used to represent a merge field within a template file. It is defined as an
object with the following properties:

### Properties

- `label` (required): a string representing the label or key of the merge field.
- `value`: an optional string representing the value to replace the merge field with.
- `defaultValue`: an optional string representing the default value to use if the `value` property
  is not provided.

_Code Generation - File Generation - Template Engine - Code Automation - CLI Tool - JSON Templates -
File System - Code Scaffolding - Code Generation CLI - Code Templates - Project Boilerplate -
Project Generation - Automated Code - Code Creation_
