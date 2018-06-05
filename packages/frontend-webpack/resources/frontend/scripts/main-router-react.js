// device
require('@ciffi-js/device');

// router
require('@ciffi-js/router').pushState(false);

// config example
import Config from 'Config';

console.log(Config);

// react component
import List from './components/List.jsx';

new List('.js-config-widget', Config);