'use strict';

var Page = (function (PageClass) {
	
	function Page() {
		
		this.config = PageClass.getConfig();
		
		start(this.config);
		
	}
	
	function start(config) {
		console.log('all pages start', config);
	}
	
	return Page;
	
});

module.exports = Page;