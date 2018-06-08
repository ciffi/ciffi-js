const chalk = require('chalk');
const ProcessManager = require('./ProcessManager');
const Loading = require('./Loading');

class CreateSSL {
  
  constructor({https}, callback) {
    
    if (!https) {
      return callback();
    }
    
    console.log('');
    
    Loading.start(`Generate ${chalk.blue(`sslcert`)}`);
    
    this.path = `${process.env.PWD}/sslcert`;
    
    new ProcessManager({
      process: `mkdir ${this.path} && openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=IT/ST=Ciffi/L=Ciffi/O=Ciffi/CN=localhost" -keyout ${this.path}/local.server.key  -out ${this.path}/local.server.crt`,
      onClose: () => {
        Loading.stop(`Generate ${chalk.blue(`sslcert`)} ${chalk.green.bold(' OK')}`);
        callback();
      }
    });
  }
  
}

module.exports = CreateSSL;