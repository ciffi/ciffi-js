'use strict';

var Cookies = (function () {

	function Cookies(config) {
		this.init(config);
	}

	function checkExpire(customExpire) {
		var date;
		if (!customExpire) {
			date = new Date();
			date.setTime(date.getTime() + (10 * 365 * 24 * 60 * 60)); // expires in 10 years
		} else {
			date = new Date(customExpire);
			date.setTime(date.getTime());
		}
		return '; expires=' + date.toGMTString();
	}

	Cookies.prototype.init = function (config) {
		this.config = config;
	};

	Cookies.prototype.write = function () {
		var expires = checkExpire(this.config.expire);
		document.cookie = this.config.name + '=' + JSON.stringify(this.config.value) + expires + '; path=/';
	};

	Cookies.prototype.read = function () {
		var nameEQ = this.config.name + '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEQ) === 0) {
				return JSON.parse(c.substring(nameEQ.length, c.length));
			}
		}
		return null;
	};

	Cookies.prototype.remove = function () {
		var expires = checkExpire('2002-09-11');
		document.cookie = this.config.name + '=' + JSON.stringify(this.config.value) + expires + '; path=/';
	};

	return Cookies;

})();

module.exports = Cookies;