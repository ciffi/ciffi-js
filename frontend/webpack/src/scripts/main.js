'use strict';

// fastclick
require('fastclick').attach(document.body);

// device
require('./components/device');

// router
require('ciffi-js-router').pushState(false);