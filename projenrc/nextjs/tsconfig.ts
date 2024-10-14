import * as fs from 'fs';
import { JsonPatch } from 'projen';
import { TypescriptConfig, TypeScriptJsxMode, TypeScriptModuleResolution } from 'projen/lib/javascript';
import { TypeScriptProject } from 'projen/lib/typescript';

export class TsConfig extends TypescriptConfig {
  constructor(project: TypeScriptProject) {
    super(project, {
      compilerOptions: {
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: TypeScriptModuleResolution.BUNDLER,
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: TypeScriptJsxMode.PRESERVE,
        incremental: true,
        baseUrl: '.',
        paths: {
          '@/*': ['./src/*'],
        },
      },
    });

    this.addInclude('next-env.d.ts');
    this.addInclude('**/*.ts');
    this.addInclude('**/*.tsx');
    this.addInclude('.next/types/**/*.ts');

    this.addExclude('node_modules');
  }

  public preSynthesize(): void {}

  public postSynthesize(): void {
    this.project.tryFindObjectFile('tsconfig.json')?.patch(
      JsonPatch.add('compilerOptions.plugins', [
        {
          name: 'next',
        },
      ]),
    );
    fs.chmodSync('tsconfig.json', 0o775);
  }
}
