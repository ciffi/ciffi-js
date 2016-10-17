'use strict';

var Page = (function () {

	function Page() {
		console.log('all page constructor');
	}

	Page.prototype.setData = function (data) {
		if (data.config.env === 'local') {
			document.write('<script src="' + data.config.baseUrl + ':35729/livereload.js?snipver=1"></script>');
		}
	};
	
	Page.prototype.load = function () {
		document.body.classList.add('appIsReady');
		console.log('all page load');
	};

	return new Page();

})();

module.exports = Page;