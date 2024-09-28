import { Component } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";
import { CopyrightComponent } from "./copyright";
import { ProTipComponent } from "./protip";

export class Components extends Component {
  constructor(project: TypeScriptProject) {
    super(project);

    new CopyrightComponent(project);
    new ProTipComponent(project);
  }
}
