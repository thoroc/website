import { TextFile } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";

export class PullRequestTemplate extends TextFile {
  constructor(project: TypeScriptProject) {
    super(project, ".github/PULL_REQUEST_TEMPLATE.md", {
      lines: [
        "# Describe your changes",
        "",
        "## Issue ticket number and link",
        "",
        "## Checklist before requesting a review",
        "",
        "- [ ] I have performed a self-review of my code",
        "- [ ] If it is a core feature, I have added thorough tests.",
        "- [ ] Do we need to implement analytics?",
        "- [ ] Will this be part of a product update? If yes, please write one phrase about this ",
      ],
    });
  }
}
