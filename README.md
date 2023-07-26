# BitActions - Github Action status on macOS menu bar

Inspired by [Hukum](https://github.com/abskmj/hukum) BitActions is a BitBar plugin that displays Github Actions (GA) status in your Mac OS X Menu Bar. It is good for watching a regular Github workflow setup from your project, but also to allow you to filter a specific branch that you are working on in a pull request workflow.

## Example

![BitActions example showing GitHub Actions status on macOS menu](images/sample.png)

## Prerequisites

- [Node.js](https://nodejs.org/)
- [XBar](https://xbarapp.com/)
- Open xbar

## Installation

Make sure you have `node` and `npm`, then run:
```sh
$ curl https://raw.githubusercontent.com/paulononaka/bitactions/master/install.sh
```

## Configuration

Open the plugin folder 

```sh
cd "$HOME/Library/Application Support/xbar/plugins/bitactions"
```

and create a `.bitactionsrc` file in your $HOME with the following contents:

```json
{
    "githubToken": "<Git hub token>. Ex: aaa_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "githubRepoName": "<Github owner/repo_name. Ex: paulononaka/bitactions>",
    "watchBranchName": "<Branch name to watch when local branch does not have any runs on GitHub. Ex: main>",
    "localRepoPath": "<Full path of your repo in your local machine. This will serve to automatically watch the branch you are. Ex: /Users/paulononaka/codes/bitactions>",
    "statusMode": "<branch|summary|rotate>. Ex: branch"
}
```

## githubToken
// **Optional** for public repos, required for privated ones - A forty-digit alphanumeric string


TLTR: Follow these steps at [docs.github.com](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) to create a personal token (classic).

BitActions uses [Github Actions API](https://docs.github.com/en/rest/reference/actions). It is possible to use these APIs without any authentication for public repositories. However, for unauthenticated requests, the rate limit allows for up to 60 requests per hour (Details at [docs.github.com](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)). Authenticated requests have higher limits, up to 5000 requests per hour.

The token does not need to have any specific scope for public repositories. However, the token  needs to have `repo - Full control of private repositories` scope for private repositories.

## githubRepoName
// **Required** - Ex: paulononaka/bitactions

You can get it from the end of your github URL. Ex: `https://github.com/paulononaka/bitactions` becomes `paulononaka/bitactions`.

## localRepoPath
// **Optional** - Ex: /Users/paulononaka/codes/bitactions

Say you have a workflow that triggers `on: pull_request`. GitHub Actions keeps one workflow for all pushed branches so the last run might not be the branch that you are working on locally, the one you really want to monitor.

Given that, set this option if you wish to watch specifics branches you are working on locally. If you set it, a submenu with the workflow will monitor this branch. If you wish the status also appears in the main Mac OS menu bar, set `statusMode` to `branch`.

Please notice that this feature uses the local branch from a local repo, so if you change the branch locally the submenu will attempt to search for that branch and if it isn't pushed yet (has no runs) it won't be displayed.

## watchBranchName
// **Optional** - Ex: main

This will be the monitored branch if you set `statusMode` to `branch`, but your local branch has no runs yet.

## statusMode
// **Optional** - branch, rotate or summary. Ex: summary

Choose how the macOS menu bar should appear in the macOS bar menu:

- summary - Shows all workflows at once, without names.
- rotate - Rotates the workflow with its name, showing one at a time.
- branch - Fixes the status to the branch you are working on your `localRepoPath`.

# How it works?
BitActions uses [Github Actions API](https://docs.github.com/en/rest/reference/actions) to get the related workflow to the recent git push and its status. It keeps on calling the APIs every time your Xbar refreshes.

# Contributing

Contribution with code or documentation by raising a [pull request](https://github.com/paulononaka/bitactions/pulls) are more than welcome! Head over to the [issues tab](https://github.com/paulononaka/bitactions/issues) to report any bug or suggest an improvement. 