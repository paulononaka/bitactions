const github = require('./github')
const localGit = require('./local_git')
const config = require('./config')
const moment = require('moment')
const humanizeDuration = require("humanize-duration")

module.exports.start = async () => {

    let output = []
    let status = []
    let localBranchRun_id = -1

    const workflows = await github.getWorkflows()

    if (config.watchRepoDir != undefined) {

        const local = await localGit.getInfo()
        let localBranchRun = await github.getLastRunFrom(local.branch, local.hash)

        if (localBranchRun != undefined) {

            localBranchRun_id = localBranchRun.id
            await submenus(output, github, `:: My Branch :: ${local.branch}`, localBranchRun)

            if (statusBranch() || statusRotate() || statusSummarized()) {
                status.push({
                    icon: icon(localBranchRun.conclusion),
                    name: local.branch
                })
            }
        }
    }

    for (let i = 0; i < workflows.length; i++) {

        const workflow = workflows[i]

        if (workflow.state == 'active') {

            const run = await github.getLastRun(workflow.id)

            try {
                if (run.id != localBranchRun_id) {

                    await submenus(output, github, workflow.name, run)

                    if (statusRotate() || statusSummarized() || config.statusMode == workflow.name) {
                        status.push({
                            icon: icon(run.conclusion),
                            name: workflow.name
                        })
                    }
                }
            } catch { }
        }
    }

    for (let i = 0; i < status.length; i++) {
        if (statusSummarized()) {
            process.stdout.write(status[i].icon)
            if (i == status.length - 1) {
                console.log()
            }
        } else {
            console.log(`${status[i].icon} ${status[i].name}`)
        }
    }
    console.log('---')

    for (let i = 0; i < output.length; i++) {
        console.log(output[i])
    }
}

async function submenus(output, github, name, run) {
    const jobs = await github.getJobs(run.id)
    print(output, '', run.conclusion, name, { html_url: run.html_url })

    for (let j = 0; j < jobs.length; j++) {

        const job = jobs[j]
        print(output, '--', job.conclusion, job.name, { itemDuration: job, html_url: job.html_url })

        for (let k = 0; k < job.steps.length; k++) {

            const step = job.steps[k]
            print(output, '----', step.conclusion, step.name, { itemDuration: step, html_url: job.html_url })
        }
    }
}

function statusBranch() {
    return config.statusMode && config.statusMode == "branch"
}

function statusRotate() {
    return config.statusMode && config.statusMode == "rotate"
}

function statusSummarized() {
    return config.statusMode == undefined || config.statusMode && config.statusMode == "summarized"
}

function print(output, level, status, name, options) {
    let duration = ''
    if (options.itemDuration != undefined) {
        let item = options.itemDuration
        const diff = moment(item.completed_at).diff(moment(item.started_at), 'milliseconds')
        duration = '\033[0;36m' + ` (${humanizeDuration(diff)})` + '\033[0m'
    }
    let href = ` | href=${options.html_url}`
    output.push(`${level} ${icon(status)} ${name}${duration}${href}`)
}

function icon(status) {
    switch (status) {
        case 'success': return '\033[0;32m●\033[0m'
        case 'failure': return '\033[0;31m●\033[0m'
        case 'cancelled': return '\033[0;37m●\033[0m'
        case 'pending': return '\033[0;34m●\033[0m'
        case 'skipped': return '\033[0;30m●\033[0m'
        default: return '\033[0;34m●\033[0m'
    }
}