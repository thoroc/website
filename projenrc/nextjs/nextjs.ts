import { Component, SampleFile } from 'projen';
import { TypeScriptProject } from 'projen/lib/typescript';
import { AddOverride } from '../utils';
import { TsConfig } from './tsconfig';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { JestConfig } from './jest';

export interface NextJsOptions {
  /**
   * Whether to include Tailwind CSS.
   * @default true
   */
  readonly tailwind?: boolean;
  /**
   * Whether to include Material UI.
   * @default true
   */
  readonly materialUi?: boolean;
}

export class NextJs extends Component {
  project: TypeScriptProject;
  readonly tailwind: boolean;
  readonly materialUi: boolean;

  constructor(project: TypeScriptProject, options?: NextJsOptions) {
    super(project);

    project.addDeps('next', 'react', 'react-dom');

    project.addDevDeps(
      '@types/node',
      '@types/react',
      '@types/react-dom',
      'eslint',
      'eslint-config-next',
      'eslint-plugin-react',
      'typescript',
    );

    this.project = project;
    this.tailwind = options?.tailwind ?? true;
    this.materialUi = options?.materialUi ?? true;

    if (this.tailwind) {
      project.addDevDeps('tailwindcss', 'autoprefixer', 'postcss');
    }

    if (this.materialUi) {
      project.addDeps(
        '@emotion/cache',
        '@emotion/react',
        '@emotion/styled',
        '@fontsource/roboto',
        '@mui/icons-material',
        '@mui/material',
        '@mui/material-nextjs',
        'next-themes',
      );
    }
  }

  public preSynthesize(): void {
    this.project.tryRemoveFile('tsconfig.json');

    const tsconfig = {
      compilerOptions: {
        lib: ['ES2019'],
        target: 'ES2019',
        module: 'CommonJS',
        moduleResolution: 'node',
      },
    };
    // AddOverride(this.project, "tsconfig.json", tsconfig);
    AddOverride(this.project, 'tsconfig.dev.json', tsconfig);

    this.project.tryFindObjectFile('tsconfig.json')?.addDeletionOverride('compilerOptions.rootDir');

    const eslintConfig = {
      extends: ['next/core-web-vitals', 'next/typescript'],
    };

    AddOverride(this.project, '.eslintrc.json', eslintConfig);

    // source code
    new TsConfig(this.project);
    new JestConfig(this.project);

    this.project.gitignore.exclude('/.next/');
    this.project.gitignore.exclude('/out/');
    this.project.gitignore.exclude('next-env.d.ts');

    this.project.addTask('dev', {
      description: 'Starts the Next.js application in development mode',
      steps: [{ exec: 'next dev' }],
    });
    this.project.addTask('server', {
      description: 'Starts the Next.js application in production mode',
      steps: [{ exec: 'next start' }],
    });
    this.project.addTask('telemetry', {
      description: 'Checks the status of Next.js telemetry collection',
      steps: [{ exec: 'next telemetry' }],
    });

    this.project
      .tryFindObjectFile('.projen/tasks.json')
      ?.addOverride('tasks.compile.steps', [{ exec: 'tsc --build' }, { exec: 'next build' }]);

    // default app source code
    const sampleFiles = [
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/app/about/page.tsx',
      'src/components/Copyright.tsx',
      'src/components/ProTip.tsx',
      'src/theme.ts',
      'next-config.mjs',
      'next-env.d.ts',
    ];

    if (this.tailwind) {
      sampleFiles.push('postcss.config.mjs');
      sampleFiles.push('tailwind.config.ts');
    }

    sampleFiles.forEach((filePath) => {
      new SampleFile(this.project, filePath, {
        contents: readFileSync(resolve(__dirname, `assets/${filePath}`), 'utf-8'),
      });
    });
  }
}
