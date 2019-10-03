const chalk = require('chalk')
const ProcessManager = require('./ProcessManager')
const Loading = require('./Loading')
const path = require('path')

class CreateSSL {
  constructor({ https }, callback) {
    if (!https) {
      return callback()
    }

    console.log('')

    Loading.start(`Generate ${chalk.blue(`sslcert`)}`)

    this.path = path.normalize(`${process.cwd()}/sslcert`)

    new ProcessManager({
      process: `mkdir ${
        this.path
      } && openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=IT/ST=Ciffi/L=Ciffi/O=Ciffi/CN=localhost" -keyout ${path.normalize(
        this.path + '/local.server.key'
      )}  -out ${path.normalize(this.path + '/local.server.crt')}`,
      onClose: () => {
        Loading.stop(
          `Generate ${chalk.blue(`sslcert`)} ${chalk.green.bold(' OK')}`
        )
        callback()
      }
    })
  }
}

module.exports = CreateSSL
