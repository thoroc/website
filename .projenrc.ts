import { web } from "projen";
import { NodePackageManager } from "projen/lib/javascript";
import {
  NextJs,
  AddOverride,
  Vercel,
  addOverrideOptions,
  DeleteOverride,
  TailWind,
} from "./projenrc";

const project = new web.NextJsTypeScriptProject({
  defaultReleaseBranch: "main",
  name: "website",
  projenrcTs: true,
  packageManager: NodePackageManager.PNPM,
  jest: true,
  eslint: true,
  prettier: true,
  mergify: false,
  tailwind: false,

  deps: [
    "@mui/material",
    "@emotion/react",
    "@emotion/styled",
    "@fontsource/roboto",
    "@mui/icons-material",
    "@vercel/speed-insights",
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

// const TARGET = "ES2019";
// const MODULE = "CommonJS";
// const MODULE_RESOLUTION = "node";

// const tsConfig = project.tryFindObjectFile("tsconfig.json");

// for (const [key, value] of Object.entries(compilerOptions)) {
//   tsConfig?.addOverride(`compilerOptions.${key}`, value);
// }

// tsConfig?.addDeletionOverride("compilerOptions.rootDir");

// const tsConfigDev = project.tryFindObjectFile("tsconfig.dev.json");
// tsConfigDev?.addOverride("compilerOptions.lib", [TARGET]);
// tsConfigDev?.addOverride("compilerOptions.target", TARGET);
// tsConfigDev?.addOverride("compilerOptions.module", MODULE);

const packageJson = project.tryFindObjectFile("package.json");
packageJson?.addOverride("engines", { node: ">=20" });
// packageJson?.addOverride("type", "module");

console.log(project instanceof web.NextJsTypeScriptProject);

const vercel = new Vercel(project);
vercel.synthesize();

new NextJs(project);
new TailWind(project);

project.synth();
