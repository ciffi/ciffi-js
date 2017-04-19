'use strict';

var Page = (function () {

	function Page() {
		console.log('@REPLACE__PAGENAME@ page constructor');
	}

	Page.prototype.setData = function (data) {

		console.log(data);

	};
	
	Page.prototype.load = function () {
		
		console.log('@REPLACE__PAGENAME@ page load');
		
		return {
			prova: [1, 2, 3, 4, 5, 6, 7, 8, 9]
		};
		
	};

	return new Page();

})();

module.exports = Page;