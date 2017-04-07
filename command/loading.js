'use strict';

var Ora = require('ora');

var Loading = (function () {
	
	function Loading() {
		this.current = false;
		this.spinners = {
			bike: {
				"interval": 300,
				"frames": [
					"    🚲 ",
					"   🚲  ",
					"  🚲   ",
					" 🚲    ",
					"🚲     "
				]
			},
			turtle: {
				"interval": 600,
				"frames": [
					"     🐢",
					"    🐢 ",
					"   🐢  ",
					"  🐢   ",
					" 🐢    "
				]
			}
		};
	}
	
	Loading.prototype.start = function (text) {
		var _spinners = this.spinners;
		this.current = Ora({
			text: text,
			spinner: _spinners.bike
		}).start();
		
		setTimeout(function () {
			this.current.spinner = _spinners.turtle
		}.bind(this), 10000);
	};
	
	Loading.prototype.stop = function (text) {
		this.current.stopAndPersist({
			text: text,
			symbol: '🦄 '
		});
	};
	
	return new Loading();
	
})();

module.exports = Loading;