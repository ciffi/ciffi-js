var Device = (function() {

	'use strict';

	function Device() {
		this.init();
	}

	function checkTouch() {
		var isTouch = 'ontouchstart' in document.documentElement;

		if(isTouch) {
			document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className += ' touch';
		}else {
			document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className += ' no-touch';
		}
	}

	Device.prototype.init = function() {
		checkTouch();
	};

	return new Device();

})();

module.exports = Device;