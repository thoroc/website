import { AutomergeStrategy } from './types';

export interface PackageRule {
  matchUpdateTypes?: string[];
  matchDepTypes?: string[];
  /**
   * Set to true to automatically approve PRs.
   */
  autoApprove?: boolean;
  /**
   * Whether to automerge branches/PRs automatically, without human intervention.
   */
  automerge?: boolean;
  /**
   * The merge strategy to use when automerging PRs. Used only if automergeType=pr.
   */
  automergeStrategy?: AutomergeStrategy;
  /**
   * How to automerge, if enabled. Automerging defaults to using Pull Requests
   */
  automergeType?: string;
}
