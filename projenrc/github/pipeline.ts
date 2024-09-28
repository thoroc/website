import { GitHub, GithubWorkflow } from "projen/lib/github";
import { JobPermission, JobStep } from "projen/lib/github/workflows-model";

export class Pipeline extends GithubWorkflow {
  constructor(github: GitHub, pnpmVersion: string) {
    super(github as GitHub, "ci");

    this.on({
      push: { branches: ["main"] },
      pullRequest: { branches: ["main"] },
    });

    const checkoutCode: JobStep = {
      name: "Checkout code",
      uses: "actions/checkout@v4",
    };

    const setupNode: JobStep = {
      name: "Setup pnpm",
      uses: "pnpm/action-setup@v4",
      with: {
        version: pnpmVersion,
        run_install: false,
      },
    };

    const installNodeJs: JobStep = {
      name: "Install Node.js",
      uses: "actions/setup-node@v4",
      with: {
        "node-version": 20,
        cache: "pnpm",
      },
    };

    const affected: JobStep = {
      name: "Find affected files",
      run: "tj-actions/verify-changed-files@v20",
      id: "affected",
      with: {
        files: "{src,test}/**/*{ts,tsx}",
      },
    };

    const installDeps: JobStep = {
      name: "Install dependencies",
      run: "pnpm i --frozen-lockfile",
      if: "steps.affected.outputs.files_changed == 'true'",
    };

    const lint: JobStep = {
      name: "Lint",
      run: "pnpm lint",
      if: "steps.affected.outputs.files_changed == 'true'",
    };

    const test: JobStep = {
      name: "Test",
      run: "pnpm test",
      if: "steps.affected.outputs.files_changed == 'true'",
    };

    this.addJob("build", {
      runsOn: ["ubuntu-latest"],
      permissions: { contents: JobPermission.READ },
      steps: [
        checkoutCode,
        setupNode,
        installNodeJs,
        affected,
        installDeps,
        lint,
        test,
      ],
    });
  }
}
