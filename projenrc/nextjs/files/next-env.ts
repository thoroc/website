import { SourceCode } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

export class NextEnv extends SourceCode {
  public constructor(project: TypeScriptProject) {
    super(project, "next-env.d.ts", { readonly: false });

    this.line(`/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.`);
  }
}