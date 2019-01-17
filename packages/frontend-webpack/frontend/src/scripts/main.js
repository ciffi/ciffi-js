// styles
import(/*webpackChunkName: 'Styles' */ '../styles/main.scss').then(() => {
  document.body.style.opacity = 1;
});

// device
import '@ciffi-js/device';

import Application from './controllers/Application';

new Application();

// webpack HMR support
if (module.hot) {
  module.hot.accept();
}

// offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
