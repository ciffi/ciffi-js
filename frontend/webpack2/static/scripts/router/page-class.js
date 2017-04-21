var Page = (function (config) {
	
	function Page() {
		
		start();
		
		return this;
	}
	
	function start() {
		if (document.body.classList.value.indexOf('app-is-ready') < 0) {
			document.body.classList.add('app-is-ready');
			console.log('page-class start');
		}
	}
	
	Page.prototype.getConfig = function () {
		return config;
	};
	
	return Page;
	
});

module.exports = Page;