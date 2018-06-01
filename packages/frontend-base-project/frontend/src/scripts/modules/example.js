export default (function () {
	
	return class Human {
		
		constructor(config) {
			this.config = config;
			this.name = this.getFromConfig('name', 'no name');
		}
		
		sayName() {
			console.log(`ciao sono ${this.name}`);
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