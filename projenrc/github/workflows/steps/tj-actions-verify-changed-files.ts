import { JobStep } from 'projen/lib/github/workflows-model';

export const ActionsVerifyChangedFiles: JobStep = {
  name: 'Find affected files',
  uses: 'tj-actions/verify-changed-files@v20',
  id: 'affected',
  with: {
    files: '{src,test}/**/*{ts,tsx}',
  },
};
