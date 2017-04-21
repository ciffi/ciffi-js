'use strict';

var Page = (function (PageClass) {
	
	var _PAGE = new PageClass();
	
	function Page() {
		
		this.config = _PAGE.getConfig();
		
		start(this.config);
		
	}
	
	function start(config) {
		console.log('all pages start', config);
	}
	
	return new Page();
	
});

module.exports = Page;