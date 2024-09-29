import { Component, github } from 'projen';
import { TypeScriptProject } from 'projen/lib/typescript';
import { CiPipeline } from './workflows';
import { PullRequestTemplate } from './templates';

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

    new CiPipeline(githubComponent, options.pnpmVersion);

    if (options.templates?.pullRequest ?? true) {
      new PullRequestTemplate(project);
    }

    this.project = project;
  }
}
