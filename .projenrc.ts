import { web } from "projen";
import { NodePackageManager } from "projen/lib/javascript";

const project = new web.NextJsTypeScriptProject({
  defaultReleaseBranch: "main",
  name: "website",
  projenrcTs: true,
  packageManager: NodePackageManager.PNPM,
  jest: true,
  eslint: true,
  prettier: true,
  mergify: false,
  tailwind: true,

  deps: [
    "@mui/material",
    "@emotion/react",
    "@emotion/styled",
    "@fontsource/roboto",
    "@mui/icons-material",
    "@vercel/speed-insights",
  ],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  // tailwind: true,          /* Setup Tailwind CSS as a PostCSS plugin. */
});

project
  .tryFindObjectFile("tsconfig.json")
  ?.addDeletionOverride("compilerOptions.rootDir");

project.synth();
