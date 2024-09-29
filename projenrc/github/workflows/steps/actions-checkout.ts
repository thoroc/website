import { JobStep } from 'projen/lib/github/workflows-model';

export const ActionsCheckout: JobStep = {
  name: 'Checkout code',
  uses: 'actions/checkout@v4',
  with: {
    'fetch-depth': 0,
  },
};
