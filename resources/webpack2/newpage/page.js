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
		console.log('@REPLACE__PAGENAME@ page start', config);
	}
	
	Page.prototype.load = function () {
		console.log('@REPLACE__PAGENAME@ loaded');
	};
	
	return new Page();
	
});

module.exports = Page;