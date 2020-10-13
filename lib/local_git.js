
const config = require('./config')
const git = require('simple-git')({ baseDir: config.localRepoDir })

module.exports.getInfo = async () => {
  const info = {}
  const status = await git.status()

  info.branch = status.current
  const log = await git.log()

  info.hash = log.latest.hash

  return info
}