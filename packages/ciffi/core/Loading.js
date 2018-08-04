'use strict';

let Ora = require('ora');

let Loading = (function () {
	
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
		let _spinners = this.spinners;
		this.current = Ora({
			text: text,
			spinner: _spinners.track
		}).start();
		
		this.timeoutBike = setTimeout(function () {
			this.current.text = text + ' -- don\'t worry';
			this.current.spinner = _spinners.bike
		}.bind(this), 15000);
		
		this.timeoutTurtle = setTimeout(function () {
			this.current.text = text + ' -- almost finished';
			this.current.spinner = _spinners.turtle
		}.bind(this), 30000);
	};
	
	Loading.prototype.stop = function (text) {
		this.current.stopAndPersist({
			text: text,
			symbol: '🦄'
		});
		
		clearTimeout(this.timeoutBike);
		clearTimeout(this.timeoutTurtle);
	};
	
	return new Loading();
	
})();

module.exports = Loading;