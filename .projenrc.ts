import { web } from "projen";
import { NodePackageManager } from "projen/lib/javascript";
import { TypeScriptAppProject } from "projen/lib/typescript";
import {
  NextJs,
  AddOverride,
  Vercel,
  addOverrideOptions,
  DeleteOverride,
  TailWind,
} from "./projenrc";

const project = new TypeScriptAppProject({
  defaultReleaseBranch: "main",
  name: "website",
  projenrcTs: true,
  packageManager: NodePackageManager.PNPM,
  jest: true,
  eslint: true,
  prettier: true,
  mergify: false,

  deps: [
    "@mui/material",
    "@emotion/react",
    "@emotion/styled",
    "@fontsource/roboto",
    "@mui/icons-material",
  ],
  description: "Personal website",
  // packageName: undefined,  /* The "name" in package.json. */
  // tailwind: true,          /* Setup Tailwind CSS as a PostCSS plugin. */
});

const addTsconfigOptions: addOverrideOptions = {
  compilerOptions: {
    lib: ["ES2019"],
    target: "ES2019",
    module: "CommonJS",
    moduleResolution: "node",
  },
};

AddOverride(project, "tsconfig.json", addTsconfigOptions);
AddOverride(project, "tsconfig.dev.json", addTsconfigOptions);

const deleteTsconfigOptions = ["compilerOptions.rootDir"];

DeleteOverride(project, "tsconfig.json", deleteTsconfigOptions);

const packageJson = project.tryFindObjectFile("package.json");
packageJson?.addOverride("engines", { node: ">=20" });
// packageJson?.addOverride("type", "module");

console.log(project instanceof web.NextJsTypeScriptProject);

new Vercel(project);
new NextJs(project);
new TailWind(project);

project.synth();
