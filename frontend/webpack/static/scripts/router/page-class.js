'use strict';

var Page = (function (config) {
	
	function Page() {
		
		start();
		
		return this;
	}
	
	function start() {
		if (document.body.classList.value.indexOf('app-is-ready') < 0) {
			document.body.classList.add('app-is-ready');
		}
	}
	
	Page.prototype.getConfig = function () {
		return config;
	};
	
	return Page;
	
});

module.exports = Page;