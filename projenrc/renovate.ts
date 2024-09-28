import { Component, JsonFile } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

export class Renovate extends Component {
  project: TypeScriptProject;

  public constructor(project: TypeScriptProject) {
    super(project, "renovate.json");

    this.project = project;
  }

  preSynthesize(): void {
    const config = {
      $schema: "https://docs.renovatebot.com/renovate-schema.json",
      extends: ["config:recommended"],
    };
    new JsonFile(this.project, "renovate.json", { obj: config, marker: false });
  }
}
