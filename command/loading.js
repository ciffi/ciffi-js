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
			},
			track: {
				"interval": 280,
				"frames": [
					"     🚚",
					"    🚚 ",
					"   🚚  ",
					"  🚚   ",
					" 🚚    "
				]
			}
		};
	}
	
	Loading.prototype.start = function (text) {
		var _spinners = this.spinners;
		this.current = Ora({
			text: text,
			spinner: _spinners.track
		}).start();
		
		setTimeout(function () {
			this.current.text = text + ' -- don\'t worry';
			this.current.spinner = _spinners.bike
		}.bind(this), 15000);
		
		setTimeout(function () {
			this.current.text = text + ' -- almost finish';
			this.current.spinner = _spinners.turtle
		}.bind(this), 30000);
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