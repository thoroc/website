import { JobStep } from 'projen/lib/github/workflows-model';

export const ActionSetupNode: JobStep = {
  name: 'Install Node.js',
  uses: 'actions/setup-node@v4',
  with: {
    'node-version': 20,
    cache: 'pnpm',
  },
};
