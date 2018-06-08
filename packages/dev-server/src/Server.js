const fs = require('fs');
const express = require('express');
const ConfigFile = `${process.env.PWD}/.ciffisettings`;
const privateKey = fs.readFileSync(`${process.env.PWD}/${ConfigFile.sslKey}`, 'utf8');
const certificate = fs.readFileSync(`${process.env.PWD}/${ConfigFile.sslCrt}/`, 'utf8');
const credentials = {key: privateKey, cert: certificate};

class Server {
  
  constructor() {
    
    this.app = express();
    
    this.server = require('https').Server(credentials, this.app);
    
    this.server.listen(ConfigFile.devServerPort, '0.0.0.0');
    
    this.initRouter();
  }
  
  initRouter() {
    
    this.app.get('/', (req, res) => {
      
      res.send('server ready');
      
    });
  }
}

module.exports = Server;