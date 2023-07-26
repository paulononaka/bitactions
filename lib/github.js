const axios = require('axios')
const config = require('./config')
const { exit } = require('process')

const options = { baseURL: `https://api.github.com/repos/${config.githubRepoName}/actions` }
options.headers = {}

if (config && config.githubToken) {
  options.headers.Authorization = `bearer ${config.githubToken}`
}

const http = axios.create(options)

module.exports.getWorkflows = async () => {
  try {
    const res = await http.get(`/workflows`)
    if (res && res.data && res.data.workflows) return res.data.workflows
    else quit('Can\'t find workflows')
  } catch (error) {
    quit('You must configure .bitactionsrc');
  }
}

module.exports.getLastRun = async (workflow) => {
  try {
    const res = await http.get(`/workflows/${workflow}/runs?page=1&per_page=1`)
    if (res && res.data && res.data.workflow_runs && res.data.workflow_runs.length > 0) return res.data.workflow_runs[0]
  } catch (error) {
    quit('Correct repo name?')
  }
}

module.exports.getJobs = async (run) => {
  try {
    const res = await http.get(`/runs/${run}/jobs`)
    if (res && res.data && res.data.jobs) return res.data.jobs
    else quit('Can\'t find jobs')
  } catch (error) {
    quit('Correct repo name?')
  }
}

module.exports.getLastRunFromBranchAndHash = async (branch, hash) => {
  try {
    const res = await http.get(`/runs?branch=${branch}`)
    if (res && res.data && res.data.workflow_runs) {
      const runs = res.data.workflow_runs
      var triggeredRun = runs.find((run) => run.head_branch === branch && run.head_sha === hash)
      return triggeredRun
    } else {
      quit('Correct branch name?')
    }
  } catch (error) {
    quit('Correct repo name?')
  }
}

module.exports.getLastRunFromBranch = async (branch) => {
  try {
    const res = await http.get(`/runs?branch=${branch}`)
    if (res && res.data && res.data.workflow_runs) {
      const runs = res.data.workflow_runs
      var triggeredRun = runs.find((run) => run.head_branch === branch)
      if (!triggeredRun) console.log('Correct branch name on watchBranchName?')
      return triggeredRun
    }
    else quit('Correct branch name?')
  } catch (error) {
    quit('Correct repo name?')
  }
}

function quit(message) {
  console.log(message)
  console.log('---');
  console.log('README | href=https://github.com/paulononaka/bitactions/blob/master/README.md');
  exit(0);
}