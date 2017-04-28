'use strict';

var Page = (function (PageClass) {
	
	function Page() {
		
		this.config = PageClass.getConfig();
		this.content = {
			prova: [1, 2, 3, 4, 5, 6, 7, 8, 9]
		};
		
		start(this.config);
		
		return this;
		
	}
	
	function start(config) {
		console.log('home page start', config);
	}
	
	Page.prototype.load = function () {
		console.log('home loaded');
	};
	
	return Page;
	
});

module.exports = Page;