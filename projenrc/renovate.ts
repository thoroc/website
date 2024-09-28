import { Component, JsonFile } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

export interface PackageRule {
  matchUpdateTypes?: string[];
  matchDepTypes?: string[];
  automerge?: boolean;
}

export interface RenovateOptions {
  schema: string;
  extends: string[];
  packageRules: PackageRule[];
}

export class Renovate extends Component {
  project: TypeScriptProject;
  public readonly schema: string;
  public readonly extends: string[];
  public packageRules: PackageRule[];

  public constructor(project: TypeScriptProject, options?: RenovateOptions) {
    super(project, "renovate.json");

    this.schema =
      options?.schema ?? "https://docs.renovatebot.com/renovate-schema.json";
    this.extends = options?.extends ?? ["config:recommended"];
    this.packageRules = options?.packageRules ?? [
      {
        matchUpdateTypes: ["minor", "patch"],
        automerge: true,
      },
      { matchDepTypes: ["devDependencies"], automerge: true },
    ];

    this.project = project;
  }

  public addPackageRule(rule: PackageRule): void {
    this.packageRules.push(rule);
  }

  preSynthesize(): void {
    const config = {
      $schema: this.schema,
      extends: this.extends,
      packageRules: this.packageRules,
    };
    new JsonFile(this.project, "renovate.json", { obj: config, marker: false });
  }
}
