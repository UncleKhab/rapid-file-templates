import chalk from "chalk";

const logFileSuccess = (content: string, indent = 0) => {
  console.log(chalk.green([`|V|${"-".repeat(indent)}${content}`]));
};
const logFileReject = (content: string, indent = 0) => {
  console.log(chalk.green([`|V|${"-".repeat(indent)}${content}`]));
};

const logSuccess = (content: string) => {
  console.log(chalk.green(chalk.bold(content)));
};
const logHeader = (content: string) => {
  console.log(chalk.bold(content));
};

export { logFileSuccess, logFileReject, logHeader, logSuccess };
