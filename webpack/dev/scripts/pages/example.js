var Page = (function() {

	'use strict';

	function Page() {
		console.log('example page loaded');
	}

	Page.prototype.setData = function(data) {
		console.log(data);
	};

	return new Page();

})();

module.exports = Page;