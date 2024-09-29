import { web } from "projen";
import {
  NodePackageManager,
  ProseWrap,
  QuoteProps,
  TrailingComma,
} from "projen/lib/javascript";
import { TypeScriptAppProject } from "projen/lib/typescript";
import {
  NextJs,
  AddOverride,
  Vercel,
  addOverrideOptions,
  DeleteOverride,
  Renovate,
  Github,
} from "./projenrc";

const pnpmVersion = "9";

const project = new TypeScriptAppProject({
  defaultReleaseBranch: "main",
  name: "website",
  description: "Personal website",
  projenrcTs: true,
  packageManager: NodePackageManager.PNPM,
  jest: true,
  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      proseWrap: ProseWrap.NEVER,
      semi: true,
      singleQuote: true,
      trailingComma: TrailingComma.ALL,
      printWidth: 120,
    },
    overrides: [
      {
        files: ["*.md"],
        options: {
          printWidth: 120,
          proseWrap: ProseWrap.ALWAYS,
          quoteProps: QuoteProps.ASNEEDED,
          semi: true,
          singleQuote: false,
        },
      },
    ],
  },
  mergify: false,
  // we will be using a custom ci pipeline for the linting and testing
  // we delegate the upgrade task to renovate
  github: false,
  pnpmVersion,
  // we will be using sample code lifted from the nextjs example
  sampleCode: false,
});

const addTsconfigOptions: addOverrideOptions = {
  compilerOptions: {
    lib: ["ES2019"],
    target: "ES2019",
    module: "CommonJS",
    moduleResolution: "node",
  },
  include: [
    "src/**/*.tsx",
    "src/**/*.ts",
    "test/**/*.ts",
    "test/**/*.tsx",
    ".projenrc.ts",
    "projenrc/**/*.ts",
    "next-env.d.ts",
  ],
};

// AddOverride(project, "tsconfig.json", addTsconfigOptions);
AddOverride(project, "tsconfig.dev.json", addTsconfigOptions);

const deleteTsconfigOptions = ["compilerOptions.rootDir"];

DeleteOverride(project, "tsconfig.json", deleteTsconfigOptions);

const packageJson = project.tryFindObjectFile("package.json");
packageJson?.addOverride("engines", { node: ">=20" });
// packageJson?.addOverride("type", "module");

console.log(project instanceof web.NextJsTypeScriptProject);

new Vercel(project);
new NextJs(project);
new Renovate(project);
new Github(project, { pnpmVersion });

project.synth();
