import * as fs from "fs";
import {
  TypescriptConfig,
  TypeScriptJsxMode,
  TypeScriptModuleResolution,
} from "projen/lib/javascript";
import { TypeScriptProject } from "projen/lib/typescript";

export class TsConfig extends TypescriptConfig {
  constructor(project: TypeScriptProject) {
    super(project, {
      compilerOptions: {
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: TypeScriptModuleResolution.BUNDLER,
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: TypeScriptJsxMode.PRESERVE,
        incremental: true,
        // plugins: [
        //   {
        //     name: "next",
        //   },
        // ],
        paths: {
          "@components/*": ["./src/components/*"],
        },
      },
    });

    this.addInclude("next-env.d.ts");
    this.addInclude("**/*.ts");
    this.addInclude("**/*.tsx");
    this.addInclude(".next/types/**/*.ts");

    this.addExclude("node_modules");
  }

  public postSynthesize(): void {
    fs.chmodSync("tsconfig.json", 0o775);
  }
}
