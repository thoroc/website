import { Component } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";
import { AddOverride, CreateSourceCode } from "./utils";

export class NextJs extends Component {
  project: TypeScriptProject;

  constructor(project: TypeScriptProject) {
    super(project);

    project.addDeps("next", "react", "react-dom");

    project.addDevDeps(
      "@types/node",
      "@types/react",
      "@types/react-dom",
      "eslint",
      "eslint-config-next",
      "eslint-plugin-react",
      "typescript",
    );

    this.project = project;
  }

  public preSynthesize(): void {
    const tsconfig = {
      compilerOptions: {
        lib: ["ES2019"],
        target: "ES2019",
        module: "CommonJS",
        moduleResolution: "node",
      },
    };
    AddOverride(this.project, "tsconfig.json", tsconfig);
    AddOverride(this.project, "tsconfig.dev.json", tsconfig);

    this.project
      .tryFindObjectFile("tsconfig.json")
      ?.addDeletionOverride("compilerOptions.rootDir");

    const eslintConfig = {
      extends: ["next/core-web-vitals", "next/typescript"],
    };

    AddOverride(this.project, ".eslintrc.json", eslintConfig);

    // next.config.mjs
    CreateSourceCode(this.project, "next.config.mjs", [
      "/** @type {import('next').NextConfig} */",
      "const nextConfig = {};",
      "",
      "export default nextConfig;",
    ]);

    // next-env.d.ts
    CreateSourceCode(this.project, "next-env.d.ts", [
      "/// <reference types='next' />",
      "/// <reference types='next/types/global' />",
    ]);
  }
}
