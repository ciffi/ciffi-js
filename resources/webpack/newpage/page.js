'use strict';

var Page = (function () {

	function Page() {
		console.log('@REPLACE__PAGENAME@ page loaded');
	}

	Page.prototype.setData = function (data) {

		console.log(data);

	};

	return new Page();

})();

module.exports = Page;