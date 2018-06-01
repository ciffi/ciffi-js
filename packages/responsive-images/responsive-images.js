var $ = require('jquery');
var Utils = require('@ciffi-js/utils');

var ResponsiveImages = (function () {
	
	function ResponsiveImages() {
		
		start();
		
		Utils.resizeEnd(function () {
			start();
		});
	}
	
	function start() {
		
		$('.js-responsive-image').each(function () {
			setImage($(this));
		});
		
	}
	
	function setImage(el) {
		var _isMobileDevice = parseInt(window.innerWidth) < 1024;
		var _isImage = el.prop('tagName') === 'IMG';
		var _mobile = el.attr('data-image-portrait');
		var _desk = el.attr('data-image-landscape');
		var _newImage = _mobile && _mobile !== '' && _mobile !== 'none' && _isMobileDevice ? _mobile : _desk;
		
		
		if (_isImage) {
			el.attr('src', _newImage);
		} else {
			el.css('background-image', 'url(' + _newImage + ')');
		}
	}
	
	return new ResponsiveImages();
	
})();

module.exports = ResponsiveImages;