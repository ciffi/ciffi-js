var Example = (function() {

	'use strict';

	function Example() {
		this.init();
	}

	Example.prototype.init = function() {
		console.log('new Example initialiazed');
	};

	Example.prototype.write = function(val) {
		console.log('Example method --> .write(\'val\')',val);
	};

	return Example;

})();

module.exports = Example;