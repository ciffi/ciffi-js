module.exports = (function () {
	
	var _html = document.querySelector('html');
	_html.className += ' ' + checkIe();
	_html.className += ' ' + checkPlatform();
	_html.className += ' ' + checkTouch();
	_html.className += ' ' + androidVersion();
	
	return {
		websocket: typeof window.WebSocket === 'function',
		webgl: detectWebGLContext(),
		touch: 'ontouchstart' in document.documentElement,
		isIe: checkIe()
	};
	
	function detectWebGLContext() {
		var canvas = document.createElement('canvas');
		var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		return gl && gl instanceof WebGLRenderingContext;
	}
	
	function checkIe() {
		var _ua = window.navigator.userAgent;
		var _version;
		var _msie;
		var _trident;
		var _edge;
		
		_msie = _ua.indexOf('MSIE ');
		if (_msie > 0) {
			
			_version = parseInt(_ua.substring(_msie + 5, _ua.indexOf('.', _msie)), 10);
			return 'ie' + _version;
		}
		
		_trident = _ua.indexOf('Trident/');
		if (_trident > 0) {
			
			var _rv = _ua.indexOf('rv:');
			_version = parseInt(_ua.substring(_rv + 3, _ua.indexOf('.', _rv)), 10);
			return 'ie' + _version;
		}
		
		_edge = _ua.indexOf('Edge/');
		if (_edge > 0) {
			
			_version = parseInt(_ua.substring(_edge + 5, _ua.indexOf('.', _edge)), 10);
			return 'edge' + _version;
		}
		
		// return 'ie11';
		return 'not-ie';
	}
	
	function androidVersion() {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		var _version = 'no-android';
		
		if (/android/i.test(userAgent)) {
			if (userAgent.indexOf('Android 5.') >= 0) {
				_version = 'android-5';
			} else {
				_version = 'android-4';
			}
			
			if (userAgent.indexOf('Chrome') >= 0 && userAgent.indexOf('Safari')) {
				_version += ' android-chrome';
			}
			
		}
		
		return _version;
	}
	
	function checkPlatform() {
		
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		
		// Windows Phone must come first because its UA also contains 'Android'
		if (/windows phone/i.test(userAgent)) {
			return 'Windows Phone';
		}
		
		if (/android/i.test(userAgent)) {
			return 'Android';
		}
		
		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return 'iOS';
		}
		
		return 'no-device';
		
	}
	
	function checkTouch() {
		
		if (checkPlatform() === 'no-device' && 'ontouchstart' in document.documentElement) {
			return 'no-touch';
		} else if ('ontouchstart' in document.documentElement) {
			return 'touch';
		} else {
			return 'no-touch';
		}
		
	}
	
})();