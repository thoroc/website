import { SourceCode } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

export class NextConfig extends SourceCode {
  public constructor(project: TypeScriptProject) {
    super(project, "next-config.mjs", { readonly: false });

    this.line(`/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;`);
  }
}
