import { Component } from 'projen';
import { TypeScriptProject } from 'projen/lib/typescript';

export class Eslint extends Component {
  project: TypeScriptProject;

  constructor(project: TypeScriptProject) {
    super(project);

    this.project = project;
  }

  preSynthesize(): void {
      const tasks = this.project.tryFindObjectFile('.projen/tasks.json');
      tasks?.addOverride('tasks.eslint', {
      name: "eslint",
      description: "Runs eslint against the codebase",
      steps: [
        {
          exec: "ESLINT_USE_FLAT_CONFIG=false eslint --ext .ts,.tsx --fix --no-error-on-unmatched-pattern $@ src test build-tools projenrc .projenrc.ts",
          receiveArgs: true
        }
      ]
    });
  }
}