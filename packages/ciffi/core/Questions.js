class Questions {
  constructor(projectName) {
    const questions = [
      this.projectName(),
      // this.wantHTTPS(),
      //this.livereload(),
      this.buildPath()
    ];
    
    if (projectName) {
      questions.shift();
    }
    
    return questions;
  }
  
  projectName() {
    return {
      type: 'input',
      name: 'projectName',
      message: 'Specify project name',
      default: 'my-project',
      validate: function (res) {
        const done = this.async();
        
        setTimeout(() => {
          const test = new RegExp(/^$|\s+|\w\s+|[\/]|^\.|\.$/);
          const testResult = test.test(res);
          
          if (typeof res !== 'string' || testResult) {
            done('☠️  Project must have real name ☠️');
            return;
          }
          
          done(null, true);
        }, 10);
      }
    };
  }
  
  wantHTTPS() {
    return {
      type: 'list',
      name: 'wantHTTPS',
      message: 'Want HTTPS?',
      default: 0,
      choices: ['yes', 'no']
    };
  }
  
  livereload() {
    return {
      type: 'list',
      name: 'livereload',
      message: 'What file watcher do you want to include in this project?',
      default: 0,
      choices: ['none', 'livereload']
    };
  }
  
  buildPath() {
    return {
      type: 'input',
      name: 'buildPath',
      message: 'Specify relative build path',
      default: '../public/static',
      validate: function (res) {
        const done = this.async();
        
        setTimeout(() => {
          const test = new RegExp(/^(\.\.\/){1,}\w/);
          const testResult = test.test(res);
          
          if (typeof res !== 'string' || !testResult) {
            done('☠️  Build path must be out of this project setup folder ☠️');
            return;
          }
          
          done(null, true);
        }, 10);
      }
    };
  }
}

module.exports = Questions;
