# BitActions - Displays Github Action status in your Mac OS X Menu Bar

Inspired by [Hukum](https://github.com/abskmj/hukum) BitActions is a BitBar plugin that displays Github Actions (GA) status in your Mac OS X Menu Bar. It works for workflows that run when a commit is pushed to Github repo. Once a commit is pushed, BitActions will show status updates in your bar.

![](.images/sample.png)

# Installation (TBD)
```bash
npm install
```

# How it works?
BitActions uses [Github Actions API](https://docs.github.com/en/rest/reference/actions) to get the related workflow to the recent git push and its status. It keeps on calling the APIs every time your BitBar refreshes.

# Configuration
Include a `.bitactionsrc` file in your home with the following contents:

```json
{
    "githubToken": "<token>",
    "githubRepoName": "<repo-name>", // Ex: paulononaka/bitactions
    "localRepoDir": "<repo-name>",   // [Optional]. Ex: /Users/paulononaka/codes/bitactions
    "watch": "summarized"            // [Optional]. [branch, rotate, summarized]
}
```

## githubToken

BitActions uses [Github Actions API](https://docs.github.com/en/rest/reference/actions). It is possible to use these APIs without any authentication for public repositories. However, for unauthenticated requests, the rate limit allows for up to 60 requests per hour (Details at [docs.github.com](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)) which can exhaust quickly. Authenticated requests have higher limits, up to 5000 requests per hour.

You can follow these steps at [docs.github.com](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) to create a personal token. The token does not need to have any specific scope for public repositories. However, the token  needs to have `repo - Full control of private repositories` scope for private repositories.

## githubRepoName

You can get it from the end of your github URL. `https://github.com/paulononaka/bitactions` becames `paulononaka/bitactions`.

## localRepoDir

Optional. Set it if you wish to include a status specifically for a branch that you are working on. If you set the option a submenu with the workflow filtered by the branch that you are working will be included. If you wish the status in your Mac OS X Menu Bar to show only this branch, set `watch` as `branch`.

## watch

Choose how the Mac OS X Menu Bar to show the status.

summarized - Shows all workflows at once, without names.
rotate - Bitbar will rotate the workflow with its name, showing one at a time.
branch - Fixes the status to the branch that you are working on your `localRepoDir`.

# Fixes & Improvements

Head over to the issues tab at [github.com](https://github.com/paulononaka/bitactions/issues) to report a bug or suggest an improvement. Feel free to contribute to the code or documentation by raising a pull request.