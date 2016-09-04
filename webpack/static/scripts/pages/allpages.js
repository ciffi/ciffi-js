'use strict';

var Page = (function () {

	function Page() {
		document.body.classList.add('appIsReady');
	}

	Page.prototype.setData = function () {

	};

	return new Page();

})();

module.exports = Page;