module.exports = (function () {
	
	return class Page {
		
		constructor(data) {
			this.data = data;
			
			this.content = {
				prova: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			};
		}
		
		onLoad() {
			console.log(`${this.data.page.route} page loaded`);
		}
	};
	
})();