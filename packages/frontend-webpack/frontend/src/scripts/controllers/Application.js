import Config from 'Config';

import Router from '../modules/Router';

class Application {
  constructor() {
    this.config = Config;
    
    new Router({
      config: this.config
    });
  }
}

export default Application;
