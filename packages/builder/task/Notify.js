const notifier = require('node-notifier');
const path = require('path');
const ConfigFile = require(path.resolve(process.cwd(), '.ciffisettings'));
const exec = require('child_process').exec;
const canSend = process.platform === 'darwin' && ConfigFile.wantNotify;

class Notify {
  
  static sendReady(msg) {
    if (canSend) {
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
  }
  
  static sendError(msg) {
    if (canSend) {
      notifier.notify({
        title: 'CIFFI-JS',
        message: msg,
        icon: path.join(__dirname, '../assets/adesivo.png'),
        sound: 'Basso',
        wait: false,
        closeLabel: 'Chiudi'
      });
    }
  }
  
  static sendObjError(msg) {
    
    if (canSend) {
      
      let errorTitle = ' - Error(js)';
      let errorMsg = msg.toString();
      let errorImage = 'webpack';
      
      if (typeof msg === 'string' && msg.indexOf('{') === 0 && JSON.parse(msg).file && JSON.parse(msg).file.indexOf('.css')) {
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
}

module.exports = Notify;
