import { GitHub, GithubWorkflow } from "projen/lib/github";
import { JobPermission, JobStep } from "projen/lib/github/workflows-model";
import { TypeScriptProject } from "projen/lib/typescript";
// import { simpleGit } from "simple-git";

export class Semver extends GithubWorkflow {
  project: TypeScriptProject;

  constructor(github: GitHub) {
    super(github as GitHub, "semver");

    this.on({
      pullRequest: { branches: ["main"] },
    });

    const checkout: JobStep = {
      name: "Checkout",
      uses: "actions/checkout@v4",
      with: { "fetch-depth": 0 },
    };

    const installGitVersion: JobStep = {
      name: "Install GitVersion",
      uses: "gittools/actions/gitversion/setup@v3.0.0",
      with: {
        versionSpec: "6.x",
      },
    };

    const determinVersion: JobStep = {
      name: "Determine Version",
      uses: "gittools/actions/gitversion/execute@v3.0.0",
    };

    const displayVersion: JobStep = {
      name: "Display SemVer",
      run: 'echo "SemVer: $GITVERSION_SEMVER" && echo "$version" && echo "$major.$minor.$patch"',
    };

    const createTag: JobStep = {
      name: "Create git tag",
      run: "git tag $GITVERSION_SEMVER",
    };

    const pushTag: JobStep = {
      name: "Push git tag",
      run: "git push origin $GITVERSION_SEMVER",
    };

    this.addJob("semver", {
      runsOn: ["ubuntu-latest"],
      permissions: {
        contents: JobPermission.WRITE,
        actions: JobPermission.WRITE,
      },
      steps: [
        checkout,
        installGitVersion,
        determinVersion,
        displayVersion,
        createTag,
        pushTag,
      ],
    });

    this.project = github.project as unknown as TypeScriptProject;
  }

  // not working
  preSynthesize() {
    //   const packageVersion = await simpleGit().raw([
    //     "describe",
    //     "--abbrev=0",
    //     "--tags",
    //   ]);
    //   console.log(
    //     `package version: ${JSON.stringify(packageVersion.replace("\n", ""))}`,
    //   );
    const packageJson = this.project.tryFindObjectFile("package.json");
    packageJson?.addOverride(
      "version",
      "0.0.2",
      // JSON.stringify(packageVersion.replace("\n", "")),
    );
  }
}
