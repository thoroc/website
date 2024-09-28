import { Component, JsonFile } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

export class Release extends Component {
  project: TypeScriptProject;

  constructor(project: TypeScriptProject) {
    super(project);

    project.addDevDeps(
      "@semantic-release/changelog",
      "@semantic-release/git",
      "@semantic-release/github",
      "@semantic-release/npm",
      "@semantic-release/release-notes-generator",
      "@semantic-release/exec",
      "semantic-release",
    );

    this.project = project;
  }

  public preSynthesize(): void {
    const config = {
      branches: ["main"],
      plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        "@semantic-release/npm",
        "@semantic-release/github",
        "@semantic-release/git",
        [
          "@semantic-release/exec",
          {
            prepareCmd: "pnpm build",
          },
        ],
      ],
    };
    new JsonFile(this.project, ".releaserc.json", {
      obj: config,
      marker: false,
    });
  }
}
