import { ElementType, TemplateStructure } from "../@types";

const ComponentStructure: TemplateStructure = {
  name: "SimpleComponent",
  root: {
    type: ElementType.Folder,
    folderProps: { name: "fileName" },
    elements: [
      {
        type: ElementType.File,
        fileProps: {
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
        type: ElementType.File,
        fileProps: {
          name: "styles.ts",
          extension: "styles",
          content: `
          const useStyles = () => {mainComponentContainer: {}}
          `,
        },
      },
      {
        type: ElementType.Folder,
        folderProps: { name: "text-files" },
        elements: [
          {
            type: ElementType.File,
            fileProps: {
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
