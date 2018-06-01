const notifier = require('node-notifier');
const path = require('path');
const ConfigFile = require(path.join(process.env.PWD, '.ciffisettings'));
const exec = require('child_process').exec;

class Notify {
  
  static sendReady(msg) {
    notifier.notify({
      title: 'CIFFI-JS',
      message: msg,
      icon: path.join(__dirname, '../assets/adesivo.png'),
      sound: 'Pop',
      wait: true,
      closeLabel: 'Chiudi',
      actions: [ConfigFile.devStartUrl],
      open: ConfigFile.devStartUrl
    }, (error, response, metadata) => {
      if (metadata && metadata.activationValue) {
        exec('open ' + metadata.activationValue);
      }
    });
  }
  
  static sendError(msg) {
    notifier.notify({
      title: 'CIFFI-JS',
      message: msg,
      icon: path.join(__dirname, '../assets/adesivo.png'),
      sound: 'Basso',
      wait: false,
      closeLabel: 'Chiudi'
    });
  }
  
  static sendObjError(msg) {
    
    console.log(typeof msg.toString());
    
    let errorTitle = ' - Error(js)';
    let errorMsg = msg.toString();
    let errorImage = 'webpack';
    
    if (typeof msg === 'string' && JSON.parse(msg).file && JSON.parse(msg).file.indexOf('.css')) {
      errorTitle = ' - Error(scss)'
      errorMsg = JSON.parse(msg).message;
      errorImage = 'sass'
    }
    
    notifier.notify({
      title: 'CIFFI-JS' + errorTitle,
      message: errorMsg,
      icon: path.join(__dirname, '../assets/adesivo.png'),
      contentImage: path.join(__dirname, '../assets/' + errorImage + '.png'),
      sound: 'Basso',
      wait: false,
      closeLabel: 'Chiudi'
    });
  }
}

module.exports = Notify;