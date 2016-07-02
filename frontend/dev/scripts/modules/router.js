var $ = require('jquery');
var Router = (function() {

	'use strict';
	
	function Router(config) {
		checkConfig(config,$.proxy(function() {
			this.init(config);
		},this));
	}

	function checkConfig(config,successCallback) {
		var errorMessage = false;
		if(config && typeof config === 'object') {

			if(!config.routes && typeof config.routes !== 'object') {
				errorMessage = 'Router - check config.routes object';
				console.error(errorMessage);
			}

			if(!config.onLoadSuccess && typeof config.onLoadSuccess !== 'function') {
				errorMessage = 'Router - check config.onLoadSuccess function';
				console.error(errorMessage);
			}

			if(!errorMessage) {
				successCallback();
			}
		}else {
			errorMessage = 'Router - cehck config object';
			console.error(errorMessage);
		}
	}

	function checkRoute(routes) {
		var _currentRoute;
		$.each(routes,function(index,route) {
			if($(route.element).length > 0) {
				_currentRoute = route.name;
				if(route.onLoad) {
					if(typeof route.onLoad !== 'function') {
						var errorMessage = 'Router - check config.routes.'+route.name+'.onLoad function';
						console.error(errorMessage);
					}else {
						route.onLoad();
					}
				}
			}
		});
		return _currentRoute;
	}

	Router.prototype.init = function(config) {
		var _routes = config.routes;
		var _start = config.onLoadSuccess;
		_start({
			currentRoute: checkRoute(_routes)
		});
	};

	Router.prototype.getCurrentRoute = function() {
		
	};

	return Router;

})();

module.exports = Router;