'use strict';

var @REPLACE__MODULENAME@ = (function() {

	function @REPLACE__MODULENAME@() {
		this.init();
	}

	@REPLACE__MODULENAME@.prototype.init = function() {
		console.log('new @REPLACE__MODULENAME@ initialiazed');
	};

	@REPLACE__MODULENAME@.prototype.write = function(val) {
		console.log('@REPLACE__MODULENAME@ method --> .write(\'val\')',val);
	};

	return @REPLACE__MODULENAME@;

})();

module.exports = @REPLACE__MODULENAME@;