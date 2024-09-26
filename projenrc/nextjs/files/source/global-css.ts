import { SourceCode } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

export class GlobalCss extends SourceCode {
  constructor(project: TypeScriptProject) {
    super(project, "src/app/global.css", { readonly: false });

    this.line(`@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}`);
  }
}
