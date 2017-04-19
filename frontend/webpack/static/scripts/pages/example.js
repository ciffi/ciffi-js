'use strict';
var $ = require('jquery');

var Page = (function () {

	function Page() {

		console.log('example page constructor');

	}

	Page.prototype.setData = function (data) {
		console.log(data);
	};
	
	Page.prototype.load = function () {
		console.log('example page load');
		
		$('h1').text('pagina example!!');
		
		return {
			prova: [1, 2, 3, 4, 5, 6, 7, 8, 9]
		};
	};

	return new Page();

})();

module.exports = Page;