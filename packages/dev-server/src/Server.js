const chalk = require('chalk');
const fs = require('fs');
const fileExists = require('file-exists');
const express = require('express');
const path = require('path');
const ConfigFile = path.join(process.cwd(), '.ciffisettings');

class Server {
  
  constructor() {
    
    if (fileExists.sync(ConfigFile)) {
      
      this.config = require(ConfigFile);
      
      this.init();
      
    } else {
      console.error(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
      return console.log('');
    }
  }
  
  init() {
    
    this.app = express();
    this.app.use(express.static(this.config.serverPublicPath));
    
    if (this.config.https) {
      
      const privateKey = fs.readFileSync(`${process.env.PWD}/${this.config.sslKey}`, 'utf8');
      const certificate = fs.readFileSync(`${process.env.PWD}/${this.config.sslCrt}`, 'utf8');
      const credentials = {key: privateKey, cert: certificate};
      
      this.server = require('https').Server(credentials, this.app);
      
    } else {
      this.server = require('http').Server(this.app)
    }
    
    this.server.listen(this.config.devServerPort, '0.0.0.0');
    
    this.initRouter();
  }
  
  initRouter() {
    
    this.app.get('*', (req, res) => {
      
      res.send('server ready');
      
    });
  }
}

module.exports = Server;
