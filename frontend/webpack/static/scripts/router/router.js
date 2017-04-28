'use strict';

/* CONFIG */
var UserConfig = require('../config/config');
var RouterConfig = require('./router-config');
var CONFIG = new RouterConfig(UserConfig.env);
var PageClass = require('./page-class')(CONFIG);
/* CONFIG */

/* PAGES */
var Pages = require('../config/pages');
/* PAGES */

/* PUSHSTATE */
var PushState = require('./pushstate');
/* PUSHSTATE */

var $ = require('jquery');
var Router = (function () {
	
	var _ALLPAGES = 'allpages';
	
	function Router(pages) {
		checkConfig(pages, $.proxy(function () {
			this.pages = pages;
			this.history = {
				pages: [],
				modules: {}
			};
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
		
		var _pageClass = new PageClass();
		var _allPage = require('../pages/' + _ALLPAGES)(_pageClass);
		new _allPage();
		
		if (pages[currentRoute]) {
			var _currentPage = require('../pages/' + currentRoute)(_pageClass);
			new _currentPage();
		}
		
	}
	
	function onPushStateChange(history, pages, currentRoute, pageClass) {
		
		if (pages[currentRoute]) {
			
			if (history.pages.indexOf(currentRoute) < 0) {
				history.pages.push(currentRoute);
				var _currentPage = require('../pages/' + currentRoute)(pageClass);
				history.modules[currentRoute] = new _currentPage();
			}
			
			var _template = require('../../views/' + currentRoute + '.html.twig');
			var _section = $('cd-view');
			var _content = history.modules[currentRoute].content;
			
			_section.html(_template(_content));
			
			history.modules[currentRoute].load();
		}
	}
	
	Router.prototype.init = function () {
		if (CONFIG.env === 'local') {
			document.write('<script src="' + CONFIG.baseUrl + ':35729/livereload.js?snipver=1" async="" defer=""></script>');
		}
	};
	
	Router.prototype.pushState = function (val) {
		
		if (val) {
			
			var _pageClass = new PageClass();
			var _allPage = require('../pages/' + _ALLPAGES)(_pageClass);
			
			new _allPage();
			
			this.isPushStateEnabled = PushState.checkSupport();
			
			if (this.isPushStateEnabled) {
				PushState.watcher(this.pages, $.proxy(function (data) {
					var _routes = this.pages;
					var _currentRoute = data.url;
					onPushStateChange(this.history, _routes, _currentRoute, _pageClass, _allPage);
				}, this));
			}
			
			var _requestRoute = window.location.pathname.replace('/', '');
			if (this.pages.hasOwnProperty(_requestRoute)) {
				PushState.push({url: _requestRoute}, _requestRoute);
			} else {
				var _count = 0;
				$.each(this.pages, function (url) {
					if (_count++ === 0) {
						PushState.push({url: url}, '');
					}
				});
			}
			
			return this.isPushStateEnabled;
		} else {
			
			var _routes = this.pages;
			onPagesLoaded(_routes, checkRoute(_routes));
			
			return 'pushState disabled';
		}
	};
	
	return new Router(Pages);
	
})();

module.exports = Router;