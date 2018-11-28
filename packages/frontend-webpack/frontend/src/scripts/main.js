// styles
import(/*webpackChunkName: 'Styles' */ "../styles/main.scss").then(() => {
  document.body.style.opacity = 1;
});

// device
import "@ciffi-js/device";

import Application from "./controllers/Application";

new Application();

// webpack HMR support
if (module.hot) {
  module.hot.accept();
}
