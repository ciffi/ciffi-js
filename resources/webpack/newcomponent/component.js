'use strict';

var @REPLACE__COMPONENTNAME@ = (function() {

	function @REPLACE__COMPONENTNAME@() {
		this.init();
	}

	@REPLACE__COMPONENTNAME@.prototype.init = function() {
		console.log('new @REPLACE__COMPONENTNAME@ initialiazed');
	};

	@REPLACE__COMPONENTNAME@.prototype.write = function(val) {
		console.log('@REPLACE__COMPONENTNAME@ method --> .write(\'val\')',val);
	};

	return @REPLACE__COMPONENTNAME@;

})();

module.exports = @REPLACE__COMPONENTNAME@;