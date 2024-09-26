import { Component } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";
import { AddOverride } from "../utils";
import { NextConfig, NextEnv, GlobalsCss, Page, Layout } from "./files";
import { TsConfig } from "./tsconfig";

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
    // project.removeTask("compile");

    // project.addTask("compile", {
    //   description: "Only compile",
    //   steps: [
    //     {
    //       exec: "tsc --build",
    //     },
    //     { exec: "next build" },
    //   ],
    // });

    this.project = project;
  }

  public preSynthesize(): void {
    this.project.tryRemoveFile("tsconfig.json");

    const tsconfig = {
      compilerOptions: {
        lib: ["ES2019"],
        target: "ES2019",
        module: "CommonJS",
        moduleResolution: "node",
      },
    };
    // AddOverride(this.project, "tsconfig.json", tsconfig);
    AddOverride(this.project, "tsconfig.dev.json", tsconfig);

    this.project
      .tryFindObjectFile("tsconfig.json")
      ?.addDeletionOverride("compilerOptions.rootDir");

    const eslintConfig = {
      extends: ["next/core-web-vitals", "next/typescript"],
    };

    AddOverride(this.project, ".eslintrc.json", eslintConfig);

    // next.config.mjs
    new NextConfig(this.project);

    // next-env.d.ts
    new NextEnv(this.project);

    // source code
    new GlobalsCss(this.project);
    new Page(this.project);
    new Layout(this.project);

    new TsConfig(this.project);

    this.project.gitignore.exclude("/.next/");
    this.project.gitignore.exclude("/out/");
    this.project.gitignore.exclude("next-env.d.ts");

    this.project.addTask("dev", {
      description: "Starts the Next.js application in development mode",
      steps: [{ exec: "next dev" }],
    });
    this.project.addTask("server", {
      description: "Starts the Next.js application in production mode",
      steps: [{ exec: "next start" }],
    });
    this.project.addTask("telemetry", {
      description: "Checks the status of Next.js telemetry collection",
      steps: [{ exec: "next telemetry" }],
    });

    this.project
      .tryFindObjectFile(".projen/tasks.json")
      ?.addOverride("tasks.compile.steps", [
        { exec: "tsc --build" },
        { exec: "next build" },
      ]);
  }
}
