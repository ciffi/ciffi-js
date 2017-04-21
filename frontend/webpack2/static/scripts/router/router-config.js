var $ = require('jquery');

var Config = (function () {

	function Config(config) {
		return generateConfig(config);
	}

	function generateConfig(config) {
		
		var _config = {};
		
		$.each(config, function (index, env) {
			if (window.location.protocol + '//' + window.location.hostname === env.baseUrl) {
				_config = {
					env: index
				};
				_config = $.extend(true, _config, config[index]);
			}
		});
		
		return _config;
	}

	return Config;

})();

module.exports = Config;