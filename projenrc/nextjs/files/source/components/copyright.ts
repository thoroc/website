import { SourceCode } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

export class CopyrightComponent extends SourceCode {
  public constructor(project: TypeScriptProject) {
    super(project, "src/components/Copyright.tsx", { readonly: false });

    this.line(`import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <MuiLink color="inherit" href="https://mui.com/">
        Your Website
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}`);
  }
}
