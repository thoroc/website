import { GitHub, GithubWorkflow } from 'projen/lib/github';
import { JobPermission, JobStep } from 'projen/lib/github/workflows-model';
import { ActionsCheckout, ActionSetupNode, PnpmActionSetup, ActionsVerifyChangedFiles } from './steps';

export class CiPipeline extends GithubWorkflow {
  constructor(github: GitHub) {
    super(github as GitHub, 'ci');

    this.on({
      push: { branches: ['main'] },
      pullRequest: { branches: ['main'] },
    });

    const installDeps: JobStep = {
      name: 'Install dependencies',
      run: 'pnpm i --frozen-lockfile',
      if: "steps.affected.outputs.files_changed == 'true'",
    };

    const lint: JobStep = {
      name: 'Lint',
      run: 'pnpm lint',
      if: "steps.affected.outputs.files_changed == 'true'",
    };

    const test: JobStep = {
      name: 'Test',
      run: 'pnpm test',
      if: "steps.affected.outputs.files_changed == 'true'",
    };

    this.addJob('build', {
      runsOn: ['ubuntu-latest'],
      permissions: { contents: JobPermission.READ },
      steps: [ActionsCheckout, PnpmActionSetup, ActionSetupNode, ActionsVerifyChangedFiles, installDeps, lint, test],
    });
  }
}
