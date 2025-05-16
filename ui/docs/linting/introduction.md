## Linting

### Commit linting

We lint the commit messages before committing through a pre-commit hook via Husky. You can edit this config in the `commitlint.config.js` in the root of the project.

We use Semantic Commit Messaging for logical naming of commits. Each commit should be labelled in one of the following categories:

Type: chore, docs, feat, fix, refactor, style, or test

More information can be found at [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### ESLint

ESLint is used for linting our Javascript files and is checked before every commit by a pre-commit hook. You can change the settings in `.eslintrc` in the root of the project.

### Prettier

Prettier is used for standardised code formatting.
