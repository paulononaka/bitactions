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
} else {
  console.log('Github personal token is not configured')
  console.log('---')
  process.exit(1)
}

const http = axios.create(options)

module.exports.getWorkflows = async () => {
  const res = await http.get(`/workflows`)

  if (res && res.data && res.data.workflows) return res.data.workflows
  else throw UnexpectedResponseError(res)
}

module.exports.getLastRun = async (workflow) => {
  const res = await http.get(`/workflows/${workflow}/runs?page=1&per_page=1`)

  if (res && res.data && res.data.workflow_runs && res.data.workflow_runs.length > 0) return res.data.workflow_runs[0]
  else throw UnexpectedResponseError(res)
}

module.exports.getJobs = async (run) => {
  const res = await http.get(`/runs/${run}/jobs`)

  if (res && res.data && res.data.jobs) return res.data.jobs
  else throw UnexpectedResponseError(res)
}

module.exports.getLastRunFrom = async (branch, hash) => {
  const res = await http.get(`/runs?branch=${branch}`)

  if (res && res.data && res.data.workflow_runs) {
    const runs = res.data.workflow_runs
    const triggeredRun = runs.find((run) => run.head_branch === branch && run.head_sha === hash)
    return triggeredRun
  }
  else throw UnexpectedResponseError(res)
}