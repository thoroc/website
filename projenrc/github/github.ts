import { Component, github } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";
import { Pipeline } from "./pipeline";
import { Semver } from "./semver";
import { PullRequestTemplate } from "./templates";

export interface GithubOptions {
  pnpmVersion: string;
  templates?: { pullRequest?: boolean };
}

export class Github extends Component {
  project: TypeScriptProject;

  constructor(project: TypeScriptProject, options: GithubOptions) {
    super(project);

    const githubComponent = new github.GitHub(project, {
      mergify: false,
      pullRequestLint: false,
    });

    new Pipeline(githubComponent, options.pnpmVersion);
    new Semver(githubComponent);

    if (options.templates?.pullRequest ?? true) {
      new PullRequestTemplate(project);
    }

    this.project = project;
  }
}
