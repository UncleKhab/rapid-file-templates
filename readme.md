# unqueue-cli

## What does this do?

If you're tired of writing the same boilerplate code over and over again, this is the tool for you

## How does it work?

You build what a command should generate in the unq.config.json file and that's it.

### Example Config File

Use the command `unq make <path> -c example`

{
  "component": {
    "name": "SimpleComponent",
    "mergeFields": [
      { "label": "[#fileName#]" },
      { "label": "[#componentName#]" },
      { "label": "[#className#]" }
    ],
    "enablePrettier": true,
    "root": {
      "type": "Folder",
      "elementProps": { "name": "[#fileName#]" },
      "elements": [
        {
          "type": "File",
          "elementProps": {
            "name": "[#fileName#].tsx",
            "parser": "babel-ts",
            "content": [
              "import {FC} from 'react'",
              "import useStyles from './styles.ts'",
              "import {useTheme} from 'injectors/theme'",
              "type Props = {}",
              "const [#componentName#]:FC<Props> = (props) => {",
              "const theme = useTheme()",
              "const styles = useStyles({theme})",
              "return <div className={styles.[#componentName#]Container}></div>",
              "}"
            ]
          }
        },
        {
          "type": "File",
          "elementProps": {
            "name": "styles.css",
            "parser": "css",
            "content": [".[#className#] {", "border-radius: 12px;", "}"]
          }
        }
      ]
    }
  }
}
