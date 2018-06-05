const exec = require('child_process').exec;

const emptyAction = () => {
};

class ProcessManager {
  
  constructor({process, onMessage = emptyAction, onError = emptyAction, onClose = emptyAction}) {
    
    const currentProcess = exec(process);
    
    currentProcess.stdout.on('data', (data) => {
      onMessage(data);
    });
    
    currentProcess.stderr.on('data', (data) => {
      onError(data);
    });
    
    currentProcess.on('close', (data) => {
      onClose(data);
    });
    
  }
  
}

module.exports = ProcessManager;