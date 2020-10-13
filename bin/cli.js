#! /usr/bin/env node

// <bitbar.title>GitHub Actions Status</bitbar.title>
// <bitbar.version>v1.0</bitbar.version>
// <bitbar.author>Paulo Henrique Nonaka</bitbar.author>
// <bitbar.author.github>paulononaka</bitbar.author.github>
// <bitbar.desc>GitHub Actions status</bitbar.desc>
// <bitbar.image>https://github.com/paulononaka/bitactions/sample.png</bitbar.image>
// <bitbar.dependencies>node</bitbar.dependencies>
// <bitbar.abouturl>https://github.com/paulononaka/bitactions</bitbar.abouturl>

const main = require('../lib/main')

main.start()
  .then(() => {
    process.exit(0)
  })
