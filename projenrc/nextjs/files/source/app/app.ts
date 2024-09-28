import { Component } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";
import { AboutPage } from "./about";
import { Layout } from "./layout";
import { Page } from "./page";

export class App extends Component {
  constructor(project: TypeScriptProject) {
    super(project);

    new Layout(project);
    new Page(project);

    new AboutPage(project);
  }
}
