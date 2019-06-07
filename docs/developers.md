# Developer Notes:

If the versions do not match then subtle issues may occur.

## Tests

`npm t`

## Linting

`npm run lint`

## Git Hooks

As a convienence, a Git "pre-push" script is available to incorporate into your
local workflow.

```bash
chmod +x ./githooks/pre-push
git config core.hooksPath `pwd`/githooks
```

This script will run the preflight checks, `npm run preflight`, before every
push to the project repository.

Should this prove to be a temporary inconvenience, or you __want__ to push
"broken" code for team discussions, then use the `--no-verify` option of the
git command.

```bash
git push --no-verify
```
