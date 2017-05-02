'use strict';

var Page = (function () {
	
	function Page(config) {
		
		this.config = config;
		
		this.onLoad = onLoad;
		
		return this;
		
	}
	
	function onLoad() {
		console.log('all pages loaded');
	}
	
	return Page;
	
});

module.exports = Page;