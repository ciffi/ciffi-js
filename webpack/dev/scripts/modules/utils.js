var $ = require('jquery');
var Utils = (function() {

	'use strict';

	function Utils() {
		
	}

	Utils.prototype.init = function() {

	};

	Utils.prototype.loading = function(action) {
		switch(action) {
			case 'show':
				$('.js-loading').removeClass('hidden');
				break;
			case 'hide':
				$('.js-loading').addClass('hidden');
				break;
			default:
				break;
		}
	};

	Utils.prototype.preloadImages = function(images,allCallback,singleCallback) {
		var _loaded = 0;
		$.each(images,function(index,url) {
			try {
				var _img = new Image();
				_img.onload = function() {
					if(singleCallback && typeof singleCallback === 'function') {
						singleCallback({
							index: index,
							src: url
						});
					}

					if(_loaded++ === images.length-1 && allCallback && typeof allCallback === 'function') {
						allCallback();
					}
				};
				_img.src = url;
			}catch (err) {
				var errorMessage = 'Utils.preloadImages() - image preload error - index: '+ index+', src: '+ url;
				console.error(errorMessage);
			}
		});
	};

	Utils.prototype.resizeEnd = function(endCallback,time) {
		
		var _old = {
			width: window.innerWidth,
			height: window.innerHeight
		};
		var _rtime = new Date('2000-01-01');
		var _timeout = false;
		var _delta = time || 250;

		function _resizeEndInner() {
		    if (new Date() - _rtime < _delta) {
		        setTimeout(_resizeEndInner, _delta);
		    } else {
		        _timeout = false;
		        endCallback({
		        	old: _old,
		        	new: {
		        		width: window.innerWidth,
		        		height: window.innerHeight
		        	}
		        });
		        _old = {
		        	width: window.innerWidth,
		        	height: window.innerHeight
		        };
		    }
		}

		$(window).resize(function() {
			_rtime = new Date();
			if (_timeout === false) {
				_timeout = true;
				setTimeout(_resizeEndInner, _delta);
			}
		});

	};

	Utils.prototype.scrollEnd = function(endCallback,element,time) {
		
		var _rtime = new Date('2000-01-01');
		var _timeout = false;
		var _delta = time || 250;
		var _el = element || window;

		var _old = $(_el).scrollTop();

		function _scrollEndInner() {
		    if (new Date() - _rtime < _delta) {
		        setTimeout(_scrollEndInner, _delta);
		    } else {
		        _timeout = false;
		        endCallback({
		        	old: _old,
		        	new: $(_el).scrollTop()
		        });
		        _old = $(_el).scrollTop();
		    }
		}

		$(document).on('scroll',_el,function() {
			_rtime = new Date();
			if (_timeout === false) {
				_timeout = true;
				setTimeout(_scrollEndInner, _delta);
			}
		});

	};

	return Utils;

})();

module.exports = Utils;