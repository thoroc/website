import { Component } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

export class MaterialUI extends Component {
  constructor(project: TypeScriptProject) {
    super(project);

    project.addDeps(
      "@emotion/cache",
      "@emotion/react",
      "@emotion/styled",
      "@fontsource/roboto",
      "@mui/icons-material",
      "@mui/material",
      "@mui/material-nextjs",
      "next-themes",
    );
  }
}
