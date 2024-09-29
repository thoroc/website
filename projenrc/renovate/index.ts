import { Component, JsonFile } from 'projen';
import { TypeScriptProject } from 'projen/lib/typescript';
import { PackageRule } from './package-rule';
import { AutomergeStrategy } from './types';

export interface RenovateOptions {
  schema: string;
  labels?: string[];
  extends?: string[];
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
  packageRules?: PackageRule[];
}

export class Renovate extends Component {
  project: TypeScriptProject;
  public readonly schema: string;
  public labels?: string[];
  public readonly extends?: string[];
  public readonly autoApprove?: boolean;
  public readonly automerge?: boolean;
  public readonly automergeStrategy?: AutomergeStrategy;
  public readonly automergeType?: string;
  public packageRules?: PackageRule[];

  public constructor(project: TypeScriptProject, options?: RenovateOptions) {
    super(project, 'renovate.json');

    this.schema = options?.schema ?? 'https://docs.renovatebot.com/renovate-schema.json';
    this.extends = options?.extends ?? ['config:recommended'];
    this.labels = options?.labels ?? ['dependencies', 'renovate'];
    this.autoApprove = options?.autoApprove ?? true;
    this.automerge = options?.automerge ?? true;
    this.automergeStrategy = options?.automergeStrategy ?? AutomergeStrategy.SQUASH;
    this.automergeType = options?.automergeType ?? 'pr';
    this.packageRules = options?.packageRules ?? [
      {
        matchUpdateTypes: ['minor', 'patch', 'pin', 'digest'],
        automerge: this.automerge,
        automergeStrategy: this.automergeStrategy,
      },
      { matchDepTypes: ['devDependencies'], automerge: this.automerge, automergeStrategy: this.automergeStrategy },
    ];

    this.project = project;
  }

  public addPackageRule(rule: PackageRule): void {
    if (!this.packageRules) {
      this.packageRules = [];
    }

    this.packageRules.push(rule);
  }

  preSynthesize(): void {
    const config = {
      $schema: this.schema,
      extends: this.extends,
      labels: this.labels,
      autoApprove: this.autoApprove,
      automerge: this.automerge,
      automergeStrategy: this.automergeStrategy,
      automergeType: this.automergeType,
      packageRules: this.packageRules,
    };
    new JsonFile(this.project, 'renovate.json', { obj: config, marker: false });
  }
}
