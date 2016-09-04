'use strict';

/* CONFIG */

var DefaulConfig = require('../config/config');
var Config = require('./router-config');
var CONFIG = new Config(DefaulConfig.envs);

/* CONFIG */

/* PAGES */
var Pages = require('../config/pages');
/* PAGES */

var $ = require('jquery');
var Router = (function () {

	function Router(pages) {
		checkConfig(pages, $.proxy(function () {
			this.pages = pages;
			this.init();
		}, this));
	}

	function checkConfig(pages, successCallback) {
		var errorMessage = false;
		if (pages && typeof pages === 'object') {

			if (!errorMessage) {
				successCallback();
			}

		}
	}

	function checkRoute(routes) {
		var _currentRoute = false;
		$.each(routes, function (index, route) {
			if ($(route).length > 0) {
				_currentRoute = index;
			}
		});
		return _currentRoute;
	}

	function onPagesLoaded(pages, currentRoute) {

		var _baseRoute = 'allpages';

		require('../pages/' + _baseRoute).setData({
			config: CONFIG.config
		});

		if (pages[currentRoute]) {
			require('../pages/' + currentRoute).setData({
				config: CONFIG.config
			});
		}
	}

	Router.prototype.init = function () {
		var _routes = this.pages;
		onPagesLoaded(_routes, checkRoute(_routes));
	};

	return new Router(Pages);

})();

module.exports = Router;