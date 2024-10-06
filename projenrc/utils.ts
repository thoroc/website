import { SourceCode } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

type OverrideOptionValues = {
  [key: string]: string | string[] | boolean | { [key: string]: string }[];
};

export type addOverrideOptions = {
  [key: string]:
    | string
    | boolean
    | string[]
    | OverrideOptionValues;
};

export const AddOverride = (
  project: TypeScriptProject,
  filename: string,
  options: addOverrideOptions,
): void => {
  const objFile = project.tryFindObjectFile(filename);

  for (const [key, value] of Object.entries(options)) {
    objFile?.addOverride(key, value);
  }
};

export type deleteOverrideOptions = string[];

export const DeleteOverride = (
  project: TypeScriptProject,
  filename: string,
  options: deleteOverrideOptions,
): void => {
  const objFile = project.tryFindObjectFile(filename);

  for (const option of options) {
    objFile?.addDeletionOverride(option);
  }
};

export const CreateSourceCode = (
  project: TypeScriptProject,
  filename: string,
  content: string[],
): void => {
  const file = new SourceCode(project, filename);

  for (const line of content) {
    file.line(line);
  }
};
