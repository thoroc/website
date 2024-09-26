import { Component, JsonFile, web } from "projen";

export class Vercel extends Component {
  constructor(project: web.NextJsTypeScriptProject) {
    super(project);

    project.addDevDeps("vercel", "@vercel/next");
  }

  public preSynthesize(): void {
    const config = {
      buildCommand: "pnpm run build",
      devCommand: "pnpm run dev",
      framework: "nextjs",
      installCommand: "pnpm run install",
    };
    new JsonFile(this.project, "vercel.json", { obj: config });
  }
}
