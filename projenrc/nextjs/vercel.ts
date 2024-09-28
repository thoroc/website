import { Component, JsonFile } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

export class Vercel extends Component {
  project: TypeScriptProject;

  constructor(project: TypeScriptProject) {
    super(project);

    project.addDeps("@vercel/speed-insights");
    project.addDevDeps("vercel", "@vercel/next");

    this.project = project;
  }

  public preSynthesize(): void {
    const config = {
      buildCommand: "pnpm run compile",
      devCommand: "pnpm run dev",
      framework: "nextjs",
      installCommand: "pnpm install:ci",
    };
    new JsonFile(this.project, "vercel.json", {
      obj: config,
      marker: false,
    });

    this.project.gitignore.exclude(".vercel");
  }
}
