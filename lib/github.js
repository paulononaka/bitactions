const axios = require('axios')
const config = require('./config')

const UnexpectedResponseError = (res) => {
  const err = new Error('Unexpected response from api')
  err.response = res
  return err
}

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
    else exit('Can\'t find workflows')
  } catch (error) {
    exit('Correct repo name?')
  }
}

module.exports.getLastRun = async (workflow) => {
  try {
    const res = await http.get(`/workflows/${workflow}/runs?page=1&per_page=1`)
    if (res && res.data && res.data.workflow_runs && res.data.workflow_runs.length > 0) return res.data.workflow_runs[0]
  } catch (error) {
    exit('Correct repo name?')
  }
}

module.exports.getJobs = async (run) => {
  try {
    const res = await http.get(`/runs/${run}/jobs`)
    if (res && res.data && res.data.jobs) return res.data.jobs
    else exit('Can\'t find jobs')
  } catch (error) {
    exit('Correct repo name?')
  }
}

module.exports.getLastRunFrom = async (branch, hash) => {
  try {
    const res = await http.get(`/runs?branch=${branch}`)
    if (res && res.data && res.data.workflow_runs) {
      const runs = res.data.workflow_runs
      const triggeredRun = runs.find((run) => run.head_branch === branch && run.head_sha === hash)
      return triggeredRun
    }
    else exit('Correct branch name?')
  } catch (error) {
    exit('Correct repo name?')
  }
}

function exit(status) {
  console.log(status)
  console.log('---')
  process.exit(1)
}