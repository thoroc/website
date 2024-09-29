import { JobStep } from 'projen/lib/github/workflows-model';

export const PnpmActionSetup: JobStep = {
  name: 'Setup pnpm',
  uses: 'pnpm/action-setup@v4',
  // with: {
  // conflict with the version specified in the package.json
  // version: pnpmVersion,
  // run_install: false,
  // },
};
