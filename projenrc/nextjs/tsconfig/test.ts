import { TypescriptConfig, TypescriptConfigExtends, TypeScriptJsxMode } from 'projen/lib/javascript';
import { TypeScriptProject } from 'projen/lib/typescript';

export class TsConfigDev extends TypescriptConfig {
  constructor(project: TypeScriptProject) {
    super(project, {
      fileName: 'tsconfig.test.json',
      extends: TypescriptConfigExtends.fromPaths(['./tsconfig.json']),
      compilerOptions: {
        jsx: TypeScriptJsxMode.REACT_JSX,
      },
    });
  }
}
