# File Generation CLI Tool Documentation

### Unleash your file creation power with Unq Make! Say goodbye to tedious and time-consuming manual file creation.

This CLI tool allows you to generate files based on templates written in JSON format. The tool is
designed to make it easy for you to generate common files for your projects and eliminates the need
for repetitive manual work.

# Usage

    unq make <path> -t <template-key>

- `<path>` is the destination path where the generated files will be placed.
- `<template-name>` is the name of the JSON template you want to use to generate the files.

## `unq.config.json`

## `TemplateStructure`

The `TemplateStructure` type is used to define the structure of a template file. It is defined as an
object with the following properties:

### Properties

- `root` (required): a `TemplateElement` object representing the root element of the template file.
- `enablePrettier`: an optional boolean indicating whether to format the output using
  [Prettier](https://prettier.io/).
- `fileName`: an optional string representing the name of the output file.
- `mergeFields`: an optional array of `MergeField` objects representing the merge fields in the
  template file.

## `MergeField`

The `MergeField` type is used to represent a merge field within a template file. It is defined as an
object with the following properties:

### Properties

- `label` (required): a string representing the label or key of the merge field.
- `value`: an optional string representing the value to replace the merge field with.
- `defaultValue`: an optional string representing the default value to use if the `value` property
  is not provided.

## `TemplateElement`

A `TemplateElement` is an object that defines a single file or directory. A `TemplateElement` has
the following properties:

- `type` (required): The type of the `TemplateElement`. It can be either `File` or `Folder`.
- `elementProps` (required): The properties of the `TemplateElement`. An object with the following
  properties:
  - `name` (required): The name of the file or directory.
  - `content`: An array of strings that define the contents of a file.
  - `parser` (optional): The name of a built-in prettier parser that will be used to parse the
    contents of a file.
- `enablePrettier` (optional): A boolean that indicates whether or not to use Prettier to format the
  generated files.
- `elements` (optional): An array of `TemplateElement` objects that define the contents of a
  directory.

#### Example JSON file

    {
      "name": "Example Project",
      "root": {
        "type": "Folder",
        "elementProps": {
          "name": "src",
          "parser": "JavaScript"
        },

    }
