export enum AutomergeStrategy {
  /**
   * Renovate decides how to merge
   */
  AUTO = 'auto',
  /**
   * "fast-forwarding" the main branch reference, no new commits in the resultant tree
   */
  FAST_FORWARD = 'fast-forward',
  /**
   * create a new merge commit
   */
  MERGE_COMMIT = 'merge-commit',
  /**
   * rewrite history as part of the merge, but usually keep the individual commits
   */
  REBASE = 'rebase',
  /**
   * flatten the commits that are being merged into a single new commit
   */
  SQUASH = 'squash',
}
