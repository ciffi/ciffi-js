'use strict';

var Page = (function (PageClass) {
	
	var _PAGE = new PageClass();
	
	function Page() {
		
		this.config = _PAGE.getConfig();
		this.content = {
			prova: [1, 2, 3, 4, 5, 6, 7, 8, 9]
		};
		
		start(this.config);
		
		return this;
		
	}
	
	function start(config) {
		console.log('example page start', config);
	}
	
	Page.prototype.load = function () {
		console.log('example loaded');
	};
	
	return new Page();
	
});

module.exports = Page;