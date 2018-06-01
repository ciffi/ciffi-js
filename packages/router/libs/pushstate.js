var $ = require('jquery');
var PushState = function () {
	function PushState() {
		this.currentRoute = false;
		this.init();
	}
	
	function setLinkInteractions(PushState) {
		$(document).on('click', 'a[href]:not([data-push=\'false\'])', function (e) {
			e.preventDefault();
			var _url = $(this).attr('href');
			if (_url.indexOf('/') === 0) {
				_url = _url.replace('/', '');
			}
			var _data = {url: _url};
			newUrl(_data, _url, PushState);
			return false;
		});
	}
	
	function newUrl(data, url, PushState) {
		if (!PushState.currentRoute || PushState.currentRoute !== url) {
			window.history.pushState(data, null, '/' + url);
		}
		return url;
	}
	
	PushState.prototype.init = function () {
		this.isSupported = window.history && typeof window.history === 'object';
	};
	PushState.prototype.checkSupport = function () {
		return this.isSupported;
	};
	PushState.prototype.watcher = function (pages, callback) {
		(function (history) {
			var pushState = history.pushState;
			history.pushState = function (state) {
				if (typeof history.onpushstate === 'function') {
					history.onpushstate({state: state});
				}
				return pushState.apply(history, arguments);
			};
		})(window.history);
		window.onpopstate = history.onpushstate = $.proxy(function (e) {
			if (e.state) {
				this.currentRoute = e.state.url;
				callback(e.state);
				$(document).trigger('routeChange');
			} else {
				//window.location.reload()
			}
		}, this);
		setLinkInteractions(this);
		return pages;
	};
	PushState.prototype.push = function (data, url) {
		newUrl(data, url, this);
	};
	return new PushState;
}();

module.exports = PushState;