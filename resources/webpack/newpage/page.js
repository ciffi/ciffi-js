var Page = (function () {

	function Page() {
		console.log('@REPLACE__PAGENAME@ page constructor');
	}

	Page.prototype.setData = function (data) {

		console.log(data);

	};
	
	Page.prototype.load = function () {
		
		console.log('@REPLACE__PAGENAME@ page load');
		
	};

	return new Page();

})();

module.exports = Page;