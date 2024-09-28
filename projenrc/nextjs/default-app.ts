import { Component } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";
import { NextConfig, NextEnv, App, Components } from "./files";

export class DefaultApp extends Component {
  constructor(project: TypeScriptProject) {
    super(project);

    // next.config.mjs
    new NextConfig(project);

    // next-env.d.ts
    new NextEnv(project);

    // source code
    new App(project);
    new Components(project);
  }
}
