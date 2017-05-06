'use strict';

var Page = (function () {
	
	function Page(config) {
		
		this.config = config;
		
		this.content = {
			prova: [1, 2, 3, 4, 5, 6, 7, 8, 9]
		};
		
		this.onLoad = onLoad;
		
		return this;
		
	}
	
	function onLoad() {
		console.log('home page loaded');
	}
	
	return Page;
	
});

module.exports = Page;