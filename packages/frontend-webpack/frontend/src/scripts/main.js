// styles
// import '../styles/main.scss';

// device
import '@ciffi-js/device';

import Application from './controllers/Application';

new Application();

// webpack HMR support
if (module.hot) {
  module.hot.accept();
}