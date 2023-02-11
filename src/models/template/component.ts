import { TemplateStructure } from "./template";
import { TemplateElementTypes } from "./template-element";

const ComponentStructure: TemplateStructure = {
  name: "SimpleComponent",
  root: {
    type: TemplateElementTypes.Folder,
    elementProps: { name: "fileName" },
    elements: [
      {
        type: TemplateElementTypes.File,
        elementProps: {
          name: "main.{extension}.tsx",
          extension: "component",
          content: `
          import React, {FC} from "react"
          import useStyles from "./styles.ts"
          type Props = {}
          const MainComponent:FC<Props>  = (props) => {
            const styles = useStyles()
            return <div className={styles.mainComponentContainer}><div>
          }
          `,
        },
      },
      {
        type: TemplateElementTypes.File,
        elementProps: {
          name: "styles.ts",
          extension: "styles",
          content: `
          const useStyles = () => {mainComponentContainer: {}}
          `,
        },
      },
      {
        type: TemplateElementTypes.Folder,
        elementProps: { name: "text-files" },
        elements: [
          {
            type: TemplateElementTypes.File,
            elementProps: {
              name: "index.txt",
              content: `I don't really know what content`,
            },
          },
        ],
      },
    ],
  },
};

export default ComponentStructure;
