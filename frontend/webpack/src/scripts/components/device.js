'use strict';

/**
 * Device js module
 * @module Device
 */
var Device = (function () {
	
	/**
	 * This get html tag and run some check to detect device specifications then add relative class to the html tag
	 * @exports Device
	 * @class
	 * @example
	 * require('./path/to/device.js');
	 */
	function Device() {
		var _el = document.getElementsByTagName('html')[0];
		checkTouch(_el);
		isSafari(_el);
	}
	
	/**
	 * This check if device support ontouchstart event
	 * @param {DOM} el - html tag
	 * @memberOf Device
	 * @inner
	 */
	function checkTouch(el) {
		var isTouch = 'ontouchstart' in document.documentElement;
		
		if (isTouch) {
			el.classList.add('touch');
		} else {
			el.classList.add('no-touch');
		}
	}
	
	/**
	 * This check if browser is safari
	 * @param {DOM} el - html tag
	 * @memberOf Device
	 * @inner
	 */
	function isSafari(el) {
		var _isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		
		if (_isSafari) {
			el.classList.add('safari');
		} else {
			el.classList.remove('safari');
		}
	}
	
	return new Device();
	
})();

module.exports = Device;