export default (function () {
	
	return class @REPLACE__MODULENAME@ {
		
		constructor(config) {
			this.config = config;
			this.name = this.getFromConfig('name', 'no name');
		}
		
		sayName() {
			console.log(`my name is ${this.name}`);
		}
		
		getFromConfig(key, alternative) {
			let _result = alternative;
			
			if (this.config) {
				_result = this.config[key] || alternative;
			}
			
			return _result;
		}
	};
	
})();