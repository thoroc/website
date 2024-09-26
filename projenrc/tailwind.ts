import { Component, SourceCode } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

export class TailWind extends Component {
  project: TypeScriptProject;

  constructor(project: TypeScriptProject) {
    super(project);

    project.addDevDeps("tailwindcss", "autoprefixer", "postcss");

    this.project = project;
  }

  preSynthesize() {
    const tailwindConfig = new SourceCode(this.project, "tailwind.config.ts");
    tailwindConfig.line(`import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;`);

    const postcssConfig = new SourceCode(this.project, "postcss.config.mjs");
    postcssConfig.line(`/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;`);
  }
}
